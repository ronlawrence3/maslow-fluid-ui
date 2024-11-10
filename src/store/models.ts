export interface AppState {
  /* Top level state: */
  /* Modules: */
  websocket?: WebsocketData;
  settings?: Settings;
  http?: HttpState;
}

/*  modules...  */
export interface WebsocketData {
  textdata: string[];
  data: string[];
  ws?: WebSocket;

}

/** read/written as json to file */
export interface Settings {
  hosts: string[];
  defaultHostIndex: number;
}

export interface HttpState {
  responseData: string;
}