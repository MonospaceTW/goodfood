import Vue from "vue";
import Result from "@/components/Result";
import todoList from "@/components/todoList";
import HelloWorld from "@/components/HelloWorld";
import Router from "vue-router";
import storeinfo from "../components/storeInfo";
import App from "@/App";
import Order from "@/components/Order";
import ComfirmOrder from "@/components/ComfirmOrder";
import NotFound from "@/components/NotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/HelloWorld",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/todo",
      name: "todoList",
      component: todoList
    },
    {
      path: "/Result",
      name: "Result",
      component: Result
    },
    {
      path: "/",
      name: "App",
      component: App,
      children: [
        {
          path: "storeinfo/:store_id?",
          name: "storeinfo",
          component: storeinfo,
          props: true
        },
        {
          path: "order/:store_id?/:order_id?",
          name: "order",
          component: Order,
          props: true
        },
        {
          path: "comfirm_order",
          name: "comfirm_order",
          component: ComfirmOrder
          // props: true
        },
        {
          path: "not_found",
          name: "not_found",
          component: NotFound
        }
      ]
    },
    {
      path: "*",
      redirect: { name: "not_found" }
    }
  ]
});
