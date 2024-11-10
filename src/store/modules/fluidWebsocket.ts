/**
 * This file contains actions, mutations, and state for communicating with fluidnc over the websocket
 * Messages can be sent over the websocket, then messages come back in response  be pushed in response, and some messages can be received without having sent anything,
 */

import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { AppState } from '../models';

/**
 * The state for a websocket connection. This contains the websocket instance itself and a buffer around what was sent and received, both via "text" and via "binary"
 */
export interface WebSocketState {
  ws?: WebSocket;
  /**commands initiated from here, with results */
  commandHistory: CommandResult[];
  /** Push related messages such as [MSG:...], <...>, Grbl: ..., ALARM: n, */
  pushLines: TimeSequencedLine[];
  /** lines that were sent as "text" on the websocket such as "PING" and "CURRENT_ID", "ACTIVE_ID" */
  textLines: TimeSequencedLine[];
  commandInProgress?: TimeSequencedLine;
  commandResponseLines: TimeSequencedLine[];
  /** partial line from last blob */
  remainder?: TimeSequencedLine;
}

/** A command and its response */
export interface CommandResult {
  command: TimeSequencedLine;
  response: TimeSequencedLine[];
  result: 'ok' | 'error';
  errorCode?: number;
}

export class CommandInProgress extends Error {}
/** A line from the websocket, along with the timestamp it was received or send (browser time) */
export interface TimeSequencedLine {
  timestamp: number; // Date ms
  line: string;
}

/**realtime commands */
const REALTIME = ['~', '?', '!', '\u0003'];

export const initialState: WebSocketState = {
  commandHistory: [],
  pushLines: [],
  textLines: [],
  commandResponseLines: [],
};

const getters: GetterTree<WebSocketState, AppState> = {};

const mutations = <MutationTree<WebSocketState>>{
  reset(state) {
    delete state.commandInProgress;
    delete state.remainder;
    delete state.ws;
    Object.assign(state, initialState);
  },
  setWs(state, ws) {
    state.ws = ws;
  },
  newBlob(state, blobContent: string) {
    const timestamp = Date.now();
    const lines: TimeSequencedLine[] = blobContent.split('\n').map((lineRaw) => {
      let line = lineRaw.trim();
      if (state.remainder) {
        line = state.remainder + line;
        state.remainder = undefined;
      }
      const tsline = { timestamp, line };
      // check line for push message and store.
      if (line.startsWith('Grbl:') || line.startsWith('[') || line.startsWith('<') || line.startsWith('ALARM:')) {
        state.pushLines.push(tsline);
      }
      if (line == 'ok' || line.startsWith('error')) {
        let errorCode = line.startsWith('error') ? parseInt(line.split(':')[1]) : 0;
        const cmdResult: CommandResult = {
          command: state.commandInProgress || { timestamp: 0, line: '' },
          response: state.commandResponseLines,
          result: line == 'ok' ? 'ok' : 'error',
          errorCode,
        };
        state.commandHistory.push(cmdResult);
        state.commandInProgress = undefined;
        state.commandResponseLines = [];
      } else {
        state.commandResponseLines.push(tsline);
      }
      return tsline;
    });

    if (blobContent[blobContent.length - 1] !== '\n') {
      const lastLine = lines.pop();
      if (lastLine) {
        state.remainder = lastLine;
      }
    }
  },
  newData(state, text) {
    const timestamp = Date.now();
    state.textLines.push({ timestamp, line: text });
  },
  currentCommand(state, line: string) {
    state.commandInProgress = { timestamp: Date.now(), line };
  },
  realtimeCommand(state, command: string) {
    state.commandHistory.push({
      command: { timestamp: Date.now(), line: command },
      response: [],
      result: 'ok',
    });
  },
};
const actions: ActionTree<WebSocketState, AppState> = {
  async connectToWebsocket(store) {
    const host = store.rootState.settings?.hosts[store.rootState.settings.defaultHostIndex] || 'maslow.local';
    const ws = new WebSocket(`ws://${host}:81`);
    ws.onmessage = async (event) => {
      if (event.data.text) {
        store.commit('newBlob', await (event.data as Blob).text());
      } else {
        store.commit('newData', event.data);
      }
    };
    store.commit('setWs', ws);
    return ws;
  },
  async sendGrblCommand(store, command: string) {
    if (REALTIME.includes(command)) {
      // TODO: handle each realtime command differently (e.g. reset interupts commands in progress?...)
      store.commit('realtimeCommand', command);
      store.state.ws?.send(command);
    } else {
      if (store.state.commandInProgress) {
        throw new CommandInProgress(
          `A command is already in progress while trying to send ${command}: (${store.state.commandInProgress})`
        );
      }
      const cmd = command + (command.endsWith('\n') ? '' : '\n');
      store.commit('currentCommand', cmd);
      store.state.ws?.send(cmd);
    }
  },
};

export const websocket: Module<WebSocketState, AppState> = {
  state: initialState,
  getters,
  mutations,
  actions,
};

export default websocket;
