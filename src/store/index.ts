import axios from "axios";
import { createStore } from "vuex";

export interface WebsocketData {
  data: string[];
  ws?: WebSocket;
}
export interface AppState {
  websocket: WebsocketData;
  responseData?: string;
}

const baseUrl = "http://maslow.lan";
const wsurl = "ws://maslow.lan:81";
const store = createStore<AppState>({
  state: {
    websocket: {
      data: [],
    },
    responseData: "",
  },
  mutations: {
    newBlob(state, addToBuffer) {
      console.log(state, addToBuffer);
      state.websocket.data.push(...addToBuffer.split('\r\n'));
    },
    newData(state, addToBuffer) {
      console.log(state, addToBuffer);
      state.websocket.data.push(addToBuffer);
    },
    setWs(state, ws) {
      console.log(ws, 'connected')
      state.websocket.ws = ws;
    },
    setResponseData(state, responseData) {
      state.responseData = responseData;
    },
  },
  actions: {
    async connectWebSocket(store) {
      const ws = await new WebSocket(wsurl);
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
    async fetchData(store, { url }) {
      const response = await axios.get(`${baseUrl}/${url}`);
      store.commit("setResponseData", response.data);
      return response.data;
    },
  },
});

export default store;
