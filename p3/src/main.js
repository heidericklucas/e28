import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import store from '@/common/store'

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

router.beforeEach(async (to, from, next) => {

  // Exact the meta information from our routes
  // Ref: https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !store.state.user) {
      // If they’re trying to access a requiresAuth route and they're not logged in, they get sent to "Access Denied" page
      next('/denied');
  }
  else {
      // In all other circumstances, send them to the route they requested
      next();
  }
});

Vue.config.productionTip = false

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
