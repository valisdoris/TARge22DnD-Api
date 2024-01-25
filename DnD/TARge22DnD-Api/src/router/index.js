import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue';

import HomeView from '../views/HomeView.vue'
import ServiceDetails from './components/servicedetails.vue';


const routes = [
  { path: '/', component: App },
  //{ path: '/servicedetails/:serviceId', name: 'servicedetails', component: ServiceDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
