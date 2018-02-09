import Vue from "vue";
import Result from "../components/Result";
import Router from "vue-router";
import App from "@/App";
import Register from "@/components/Register";
import Login from "@/components/Login";
import ForgotPw from "@/components/ForgotPw";
import StoreList from "../components/StoreList";
import StoreInfo from "../components/StoreInfo";
import Order from "@/components/Order";
import Comfirmed from "@/components/Comfirmed";
import NotFound from "@/components/NotFound";
import Member from "../components/Member";
import homepage from "../components/homepage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
      children: [
        {
          path: "register",
          name: "register",
          component: Register
        },
        {
          path: "login",
          name: "login",
          component: Login
        },
        {
          path: "forgotpw",
          name: "forgotpw",
          component: ForgotPw
        },
        {
          path: "loading",
          name: "homepage",
          component: homepage
        },
        {
          path: "storelist",
          name: "storelist",
          component: StoreList
        },
        {
          path: "storeinfo/:storeId?",
          name: "storeinfo",
          component: StoreInfo,
          props: true
        },
        {
          path: "order/:storeId?/:orderId?",
          name: "order",
          component: Order,
          props: true
        },
        {
          path: "comfirmed/:orderId?/:thisOrderKey?",
          name: "comfirmed",
          component: Comfirmed,
          props: true
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
      redirect: {
        name: "not_found"
      }
    }
  ]
});
