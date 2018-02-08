import Vue from "vue";
import Router from "vue-router";
import storeinfo from "../components/storeInfo";
import App from "@/App";
import Order from "@/components/Order";
import ComfirmOrder from "@/components/ComfirmOrder";
import NotFound from "@/components/NotFound";
import Member from "../components/Member";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
      children: [
        {
          path: "storeinfo/:storeId?",
          name: "storeinfo",
          component: storeinfo,
          props: true
        },
        {
          path: "order/:storeId?/:orderId?",
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
        },
        {
          path: "home",
          name: "home",
          component: App
          // props: true
        },
        {
          path: "member",
          name: "member",
          component: Member
          // props: true
        }
      ]
    },
    {
      path: "*",
      redirect: { name: "not_found" }
    }
  ]
});
