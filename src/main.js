// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var firebase = require("firebase");

Vue.config.productionTip = false


var config = {
  apiKey: "AIzaSyBMRANtWtuf5Quz26GxkEnb4rRJ1t7OAkg",
  authDomain: "goodfood-39158.firebaseapp.com",
  databaseURL: "https://goodfood-39158.firebaseio.com",
  projectId: "goodfood-39158",
  storageBucket: "goodfood-39158.appspot.com",
  messagingSenderId: "940303768399"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
