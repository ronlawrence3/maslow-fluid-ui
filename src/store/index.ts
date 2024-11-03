import {
    BaseDirectory,
    create,
    exists,
    mkdir,
    readTextFile,
} from "@tauri-apps/plugin-fs";
import { fetch } from "@tauri-apps/plugin-http";
import { createStore } from "vuex";

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
      state.websocket.data.push(...addToBuffer.split("\r\n"));
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
    async sendCommand(store, command) {
        return await store.dispatch('fetchData', { path: 'command',params: { commandText: command, PAGEID: '' } })
    },
    async fetchData(store, { path, params }) {
      const host =
        store.state.settings.hosts[store.state.settings.defaultHostIndex];
      const response = await fetch(
        `http://${host}/${path}?${new URLSearchParams(params).toString()}`,
        { method: "GET" }
      );
      store.commit("setResponseData", response.body);
      return response.body;
    },
  },
});

export default store;
