import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todoList from "@/components/todoList";
import Order from "@/components/Order";
import ComfirmOrder from "@/components/ComfirmOrder";


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/ComfirmOrder/:storeId/:orderId',
      name: 'ComfirmOrder',
      component: ComfirmOrder,
      props: true
    },
  ]
})
