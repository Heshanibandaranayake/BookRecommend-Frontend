import { createApp } from 'vue';
//import Vue from 'vue'
import App from './App.vue';
import './assets/style.css'; // Import the external CSS
import router from "./router";
import './assets/css/bootstrap.min.css';

//import './assets/fa-all.css';
//import { BootstrapVue} from 'bootstrap-vue'


createApp(App).use(router).mount('#app');
//Vue.use(BootstrapVue)