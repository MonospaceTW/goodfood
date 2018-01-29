import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Order from "@/components/Order";
import ComfirmOrder from "@/components/ComfirmOrder";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children: [

        {
          path: 'order/:store_id?/:order_id?',
          name: 'order',
          component: Order,
          props: true
        },
        {
          path: 'comfirm_order/:store_id?/:order_id?',
          name: 'comfirm_order',
          component: ComfirmOrder,
          props: true
        },

      ]
    },





  ]
})
