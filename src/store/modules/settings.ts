import { BaseDirectory, create, exists, mkdir, readTextFile } from '@tauri-apps/plugin-fs';
import { Module } from 'vuex';
import { AppState, Settings } from '../models';

const SETTINGS_FILE = 'maslow-settings.txt';

const initialState: Settings = {
  hosts: ['maslow.local'],
  defaultHostIndex: 0,
};

export const settings: Module<Settings, AppState> = {
  state: initialState,
  mutations: {
    setSettings(state, settings) {
      Object.assign(state, settings);
    },
  },
  actions: {
    async saveSettings(store) {
      try {
        if (!(await exists(SETTINGS_FILE, { baseDir: BaseDirectory.AppConfig }))) {
          await mkdir('', { baseDir: BaseDirectory.AppConfig, recursive: true });
        }
        const file = await create(SETTINGS_FILE, {
          baseDir: BaseDirectory.AppConfig,
        });
        file.write(
          new TextEncoder().encode(
            JSON.stringify(store.state)
          )
        );
        file.close();
      } catch (error) {
        console.error(error);
      }
    },
     async loadSettings(store) {
      try {
        if (!(await exists(SETTINGS_FILE, { baseDir: BaseDirectory.AppConfig }))) {
          await store.dispatch("saveSettings");
        }
        const fileContent = await readTextFile(SETTINGS_FILE, {
          baseDir: BaseDirectory.AppConfig,
        });
        store.commit('setSettings', JSON.parse(fileContent));
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default settings;
