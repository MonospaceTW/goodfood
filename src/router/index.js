import Vue from 'vue'
import Router from 'vue-router'
import storeinfo from '../components/storeInfo'
import App from '../App'
import Order from '../components/Order.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children: [
        {
          path: 'storeinfo/:store_id?',
          name: 'storeinfo',
          component: storeinfo,
          props: true
        },
        {
          path: 'order/:store_id?/:order_id?',
          name: 'order',
          component: Order,
          props: true
        }
      ]
    }
  ]
})
