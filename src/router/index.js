import Vue from "vue";
import Index from "@/components/Index";
import Result from "@/components/Result";
import Router from "vue-router";
import App from "@/App";
import Register from "@/components/Register";
import Login from "@/components/Login";
import ForgotPw from "@/components/ForgotPw";
import StoreList from "@/components/StoreList";
import StoreInfo from "@/components/StoreInfo";
import Order from "@/components/Order";
import Confirmed from "@/components/Confirmed";
import NotFound from "@/components/NotFound";
import homepage from "@/components/homepage";

Vue.use(Router);

const router = new Router({
  routes: [{
    path: "/",
    name: "App",
    component: App,
    meta: {
      title: route => {
        return "訂便當系統";
      }
    },
    children: [{
      path: "",
      name: "index",
      component: Index,
      meta: {
        title: route => {
          return "訂便當 首頁";
        }
      }
    },
    {
      path: "register",
      name: "register",
      component: Register,
      meta: {
        title: route => {
          return "會員註冊";
        }
      }
    },
    {
      path: "login",
      name: "login",
      component: Login,
      meta: {
        title: route => {
          return "會員登入";
        }
      }
    },
    {
      path: "forgotpw",
      name: "forgotpw",
      component: ForgotPw,
      meta: {
        title: route => {
          return "忘記密碼";
        }
      }
    },
    {
      path: "loading",
      name: "homepage",
      component: homepage,
      meta: {
        title: route => {
          return "訂便當系統";
        }
      }
    },
    {
      path: "storelist",
      name: "storelist",
      component: StoreList,
      meta: {
        title: route => {
          return "店家列表";
        }
      }
    },
    {
      path: "storeinfo/:storeId",
      name: "storeinfo",
      component: StoreInfo,
      props: true,
      meta: {
        title: route => {
          return "店家資訊";
        }
      }
    },
    {
      path: "order/:orderId/:storeId/:storeName?",
      name: "order",
      component: Order,
      props: true,
      meta: {
        title: route => {
          return (route.params.storeName || "便當") + "訂購頁";
        }
      }
    },
    {
      path: "confirmed/:orderId?/:storeId?",
      name: "confirmed",
      component: Confirmed,
      meta: {
        title: route => {
          return "訂購完成";
        }
      },
      props: true
    },
    {
      path: "result/:orderId/:storeId",
      name: "result",
      component: Result,
      meta: {
        title: route => {
          return "訂購結果";
        }
      },
      props: true
    },
    {
      path: "not_found",
      name: "not_found",
      component: NotFound,
      meta: {
        title: route => {
          return "訂便當系統";
        }
      }
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title(to);
  next();
});

export default router;
