// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
const firebase = require("firebase");

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyABPPoZz3rI62WkpOCanHEwNXMakhHxNGY",
  authDomain: "goodfood-clover.firebaseapp.com",
  databaseURL: "https://goodfood-clover.firebaseio.com",
  projectId: "goodfood-clover",
  storageBucket: "goodfood-clover.appspot.com",
  messagingSenderId: "45979887609"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
