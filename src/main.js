import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import router from './router'

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Card from "primevue/card";

import InputText from "primevue/inputtext";
import Checkbox from 'primevue/checkbox';

createApp(App)
    .use(router)
    .use(PrimeVue, {ripple: true})
    .component('pv-toolbar', Toolbar)
    .component('pv-button', Button)
    .component('pv-sidebar', Sidebar)
    .component('pv-card', Card)
    //
    .component('pv-input', InputText)
    .component('pv-checkbox', Checkbox)
    .mount('#app')
