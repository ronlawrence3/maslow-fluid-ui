import { createLogger, createStore } from 'vuex';
import { AppState } from './models';
import { websocket } from './modules/fluidWebsocket';
import { http } from './modules/http';
import { settings } from './modules/settings';

const debug = process.env.NODE_ENV !== 'production';

export default createStore<AppState>({
  modules: {
    websocket,
    settings,
    http,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {},
  mutations: {
  },
  actions: {
  },
});

