import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import router from './router/index.js'

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Card from "primevue/card";

import InputText from "primevue/inputtext";
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import TabMenu from 'primevue/tabmenu';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

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
    .component('pv-dropdown', Dropdown)
    .component('pv-toggle-button', ToggleButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-dialog', Dialog)
    .component('pv-tab-menu', TabMenu)
    .component('pv-tab-view', TabView)
    .component('pv-tab-panel', TabPanel)
    .mount('#app')
