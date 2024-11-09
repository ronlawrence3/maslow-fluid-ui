export interface WebsocketData {
  textdata: string[];
  data: string[];
  ws?: WebSocket;
}

export interface AppState {
  settings: any;
  inputValue: string;
  responseData?: string;
}
