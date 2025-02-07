import { createApp } from 'vue';
// Vuetify
import Aura from '@primevue/themes/aura';
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
      preset: Aura,
    },
  })
  .use(store)
  .mount('#app');
