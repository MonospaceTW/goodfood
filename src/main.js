// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var firebase = require("firebase");

Vue.config.productionTip = false


var config = {
  apiKey: "AIzaSyDt2_EF30nrXcNKl40a9raKp20t_iQ5gtA",
  authDomain: "goodfood-new.firebaseapp.com",
  databaseURL: "https://goodfood-new.firebaseio.com",
  projectId: "goodfood-new",
  storageBucket: "goodfood-new.appspot.com",
  messagingSenderId: "730228409428"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
