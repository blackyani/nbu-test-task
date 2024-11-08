import { createApp } from 'vue';
import './style.css';
import 'primeicons/primeicons.css'
import App from './App.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(pinia);
app.use(router);
app.mount('#app');
