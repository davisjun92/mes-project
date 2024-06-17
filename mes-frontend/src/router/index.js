import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import Dashboard from '../components/Dashboard.vue';

window.Vue = Vue
console.log(window.Vue)
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Dashboard },
  // Add routes for other components here
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
