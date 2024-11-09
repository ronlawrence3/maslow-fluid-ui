import {
    BaseDirectory,
    create,
    exists,
    mkdir,
    readTextFile,
} from "@tauri-apps/plugin-fs";
import { fetch } from "@tauri-apps/plugin-http";
import { ActionContext, createStore } from "vuex";

export interface WebsocketData {
  textdata: string[];
  data: string[];
  ws?: WebSocket;
}
export interface AppState {
  settings: any;
  websocket: WebsocketData;
  inputValue: string;
  responseData?: string;
}
const store = createStore<AppState>({
  state: {
    settings: {},
    websocket: {
      textdata: [],
      data: [],
    },
    inputValue: "",
    responseData: "",
  },
  mutations: {
    setSettings(state, settings) {
      state.settings = settings;
    },
    newBlob(state, addToBuffer) {
      state.websocket.data.push(...addToBuffer.split("\n"));
    },
    newData(state, addToBuffer) {
      state.websocket.textdata.push(addToBuffer);
    },
    setWs(state, ws) {
      state.websocket.ws = ws;
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
    async sendImmediateCommand(store, command) {
      store.state.websocket.ws?.send(command);
    },
    async sendCommand(store, command) {
      store.state.websocket.ws?.send(command + "\n");
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

export default store