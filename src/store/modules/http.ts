import { Module } from 'vuex';
import { AppState, HttpState } from '../models';

export const http: Module<HttpState, AppState> = {
  mutations: {
    setResponseData(state, responseData) {
      state.responseData = responseData;
    },
  },
  actions: {
    async sendCommandHttp(store, command) {
      return await store.dispatch('get', {
        path: 'command',
        params: { commandText: command, PAGEID: '' },
      });
    },
    async get(store, { path, params }) {
      const response = await callFetch(store.rootState, path, 'GET', params);
      store.commit('setResponseData', response.body);
      return response.body;
    },
    async post(store, { path, params, body, contentType }) {
      const response = await callFetch(store.rootState, path, 'POST', params, body, contentType);
      store.commit('setResponseData', response.body);
      return response.body;
    },
    async delete(store, { path, params }) {
      const response = await callFetch(store.rootState, path, 'DELETE', params);
      store.commit('setResponseData', response.body);
      return response.body;
    },
  },
};

async function callFetch(
  store: AppState,
  path: string,
  method: 'GET' | 'POST' | 'DELETE',
  params?: any,
  body?: any,
  contentType?: 'application/json' | 'text/plain'
): Promise<Response> {
  const host = store.settings?.hosts[store.settings.defaultHostIndex] || 'maslow.local';
  const url = `http://${host}/${path}${params ? new URLSearchParams(params).toString() : ''}`;
  const options: RequestInit = {
    method,
    body,
  };
  if (contentType) {
    options.headers = { 'Content-type': contentType };
  }
  return fetch(url, options);
}

export default http;