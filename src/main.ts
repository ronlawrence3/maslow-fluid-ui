import { createApp } from 'vue';
// Vuetify
import Material from '@primevue/themes/material';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

// Components
import App from './App.vue';
import store from './store';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(PrimeVue, {
    theme: {
      preset: Material,
      options: {
        darkModeSelector: 'use-dark-mode'
      }
    },
  })
  .use(store)
  .mount('#app');
