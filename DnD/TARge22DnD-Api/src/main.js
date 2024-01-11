import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ServiceDetails from './components/ServiceDetails.vue'
import router from './router'


const routes = [
  { path: '/service-details', component: ServiceDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)

app.use(router)

app.mount('#app')
