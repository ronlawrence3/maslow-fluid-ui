import {
  BaseDirectory,
  create,
  exists,
  mkdir,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { fetch } from "@tauri-apps/plugin-http";
import { ActionContext, createLogger, createStore } from "vuex";
import { AppState } from "./models";
import { websocket } from './modules/fluidWebsocket';

const debug = process.env.NODE_ENV !== "production";

export default createStore<AppState>({
  modules: {
    websocket,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    settings: {},
    inputValue: "",
    responseData: "",
  },
  mutations: {
    setSettings(state, settings) {
      state.settings = settings;
    },
    setResponseData(state, responseData) {
      state.responseData = responseData;
    },
    updateInputValue(state, inputValue) {
      state.inputValue = inputValue;
    },
  },
  actions: {
    async loadSettings(store) {
      try {
        const settingsFile = "maslow-settings.txt";
        if (
          !(await exists(settingsFile, { baseDir: BaseDirectory.AppConfig }))
        ) {
          await mkdir("", { baseDir: BaseDirectory.AppConfig });
          const file = await create(settingsFile, {
            baseDir: BaseDirectory.AppConfig,
          });
          file.write(
            new TextEncoder().encode(
              JSON.stringify({
                hosts: ["maslow.local"],
                defaultHostIndex: 0,
              })
            )
          );
          file.close();
        }
        const fileContent = await readTextFile(settingsFile, {
          baseDir: BaseDirectory.AppConfig,
        });
        store.commit("setSettings", JSON.parse(fileContent));
      } catch (error) {
        console.error(error);
      }
    },
    async connectWebSocket(store) {
      const host =
        store.state.settings.hosts[store.state.settings.defaultHostIndex];
      const ws = await new WebSocket(`ws://${host}:81`);
      ws.onmessage = async (event) => {
        if (event.data.text) {
          store.commit("newBlob", await (event.data as Blob).text());
        } else {
          store.commit("newData", event.data);
        }
      };
      store.commit("setWs", ws);
      return ws;
    },
    async sendCommandHttp(store, command) {
      return await store.dispatch("get", {
        path: "command",
        params: { commandText: command, PAGEID: "" },
      });
    },
    async get(store, { path, params }) {
      const response = await callFetch(store, path, "GET", params);
      store.commit("setResponseData", response.body);
      return response.body;
    },
    async post(store, { path, params, body, contentType }) {
      const response = await callFetch(
        store,
        path,
        "POST",
        params,
        body,
        contentType
      );
      store.commit("setResponseData", response.body);
      return response.body;
    },
    async delete(store, { path, params }) {
      const response = await callFetch(store, path, "DELETE", params);
      store.commit("setResponseData", response.body);
      return response.body;
    },
  },
});

async function callFetch(
  store: ActionContext<AppState, AppState>,
  path: string,
  method: "GET" | "POST" | "DELETE",
  params?: any,
  body?: any,
  contentType?: "application/json" | "text/plain"
): Promise<Response> {
  const host =
    store.state.settings.hosts[store.state.settings.defaultHostIndex];
  const url = `http://${host}/${path}${
    params ? new URLSearchParams(params).toString() : ""
  }`;
  const options: RequestInit = {
    method,
    body,
  };
  if (contentType) {
    options.headers = { "Content-type": contentType };
  }
  return fetch(url, options);
}
