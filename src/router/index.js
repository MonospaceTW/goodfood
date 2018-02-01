import Vue from "vue";
import Result from "@/components/Result";
import Router from "vue-router";
import storeinfo from "../components/storeInfo";
import App from "@/App";
import Order from "@/components/Order";
import ComfirmOrder from "@/components/ComfirmOrder";
import NotFound from "@/components/NotFound";
import homepage from "../components/homepage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:"/loading",
      name:"homepage",
      component: homepage
    },
    {
      path: "/",
      name: "App",
      component: App,
      children: [{
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
        path: "result",
        name: "result",
        component: Result
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
      redirect: {
        name: "not_found"
      }
    }
  ]
});
