import { createStore, Store } from 'vuex';
import fluidWebsocket, { CommandInProgress, WebSocketState } from './fluidWebsocket';

// Define the MockWebSocket class
class MockWebSocket {
  CONNECTING = 0;
  OPEN = 1;
  CLOSING = 2;
  CLOSED = 3;
  send = jest.fn();
  readyState = 1;
  onmessage: ((this: WebSocket, ev: MessageEvent<any>) => any) | null = null;
  close = jest.fn();
  constructor(url: string) {
    url;
  }
}

// Replace the global WebSocket with MockWebSocket
global.WebSocket = MockWebSocket as any;

describe('fluidWebsocket Vuex Module', () => {
  let store: Store<WebSocketState>;

  beforeEach(() => {
    store = createStore(fluidWebsocket as any);
    store.commit('resetWs');
    const ws = new MockWebSocket('ws://localhost');
    store.commit('setWs', ws);
  });

  it('should initialize with the correct state', () => {
    const state = store.state;
    expect(state.commandHistory).toEqual([]);
    expect(state.pushLines).toEqual([]);
    expect(state.textLines).toEqual([]);
    expect(state.commandResponseLines).toEqual([]);
    expect(state.commandInProgress).toBeUndefined();
    expect(state.remainder).toBeUndefined();
  });

  it('should handle new blob data', () => {
    const blobContent = 'Grbl: Hello\nok\n';
    store.commit('newBlob', blobContent);
    expect(store.state.pushLines.length).toBe(1);
    // expect(store.state.commandHistory.length).toBe(1);
    expect(store.state.commandResponseLines.length).toBe(1);
  });

  it('should handle new text data', () => {
    const text = 'PING:';
    store.commit('newData', text);
    expect(store.state.textLines.length).toBe(1);
    expect(store.state.textLines[0].line).toBe(text);
  });

  it('should set current command', () => {
    const command = 'G0 X10';
    store.commit('currentCommand', command);
    expect(store.state.commandInProgress?.line).toBe(command);
  });

  it('should handle realtime command', () => {
    const command = '~';
    store.commit('realtimeCommand', command);
    expect(store.state.commandHistory.length).toBe(1);
    expect(store.state.commandHistory[0].command.line).toBe(command);
  });

  it('should connect to websocket', async () => {
    const host = 'localhost';
    const ws = await store.dispatch('connectToWebsocket', host);
    expect(store.state.ws).toEqual(ws);
  });

  it('should send Grbl command', async () => {
    const command = 'G0 X10';
    await store.dispatch('sendGrblCommand', command);
    expect(store.state.ws?.send).toHaveBeenCalledWith(command + '\n');
    expect(store.state.commandInProgress?.line).toBe(command + '\n');
  });

  it('should throw error if command is already in progress', async () => {
    const command = 'G0 X10';
    store.commit('currentCommand', 'G0 X5');
    await expect(store.dispatch('sendGrblCommand', command)).rejects.toThrow(CommandInProgress);
  });

  it('should handle long WebSocket messages', async () => {
    store.commit('currentCommand', 'test');
    const host = 'localhost';
    const ws = await store.dispatch('connectToWebsocket', host);
    let messageEvent = new MessageEvent('message', {
      data: new Blob(['list\nof\nlines tha']),
    });
    await ws.onmessage?.(messageEvent);
    messageEvent = new MessageEvent('message', {
      data: new Blob(['t have more\nlines tha']),
    });
    await ws.onmessage?.(messageEvent);
    messageEvent = new MessageEvent('message', {
      data: new Blob(['t have multiline\nof\nok\n']),
    });
    await ws.onmessage?.(messageEvent);
    expect(store.state.commandHistory[0].command.line).toEqual('test');
    expect(store.state.commandHistory[0].response.map((rl) => rl.line)).toEqual([
      'list',
      'of',
      'lines that have more',
      'lines that have multiline',
      'of',
    ]);
  });
});
