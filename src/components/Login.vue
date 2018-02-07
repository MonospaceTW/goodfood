<script>
var firebase = require("firebase");
var SimpleVueValidation = require("simple-vue-validator");
var Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "必填",
    minLength: "密碼長度需大於六字元",
    email: "e-mail格式不符"
  }
});

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMail: "",
      errorPw: ""
    };
  },
  created() {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log("User is signed in.", user);
    //   } else {
    //     console.log("User is not logined yet.");
    //   }
    // });
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    email: function(value) {
      return Validator.value(value)
        .required()
        .email();
    },
    password: function(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    }
  },
  methods: {
    login: function() {
      this.$validate().then(success => {
        if (success) {
          console.log("Validation succeeded!");

          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.$router.go(-1);
            })
            .catch(error => {
              console.log(error.code);
              this.validateLogin(error.code);
            });
        }
      });
    },
    validateLogin(errorCode) {
      switch (errorCode) {
        case "auth/user-not-found":
          this.errorMail = "查無此帳號";
          break;
        case "auth/wrong-password":
          this.errorPw = "密碼錯誤";
          break;
        case "auth/invalid-email":
          this.errorMail = "E-mail格式錯誤";
          break;
        case "auth/user-disabled":
          this.errorMail = "此帳號已停用";
          break;
      }
    },
    resetErrMsg() {
      this.errorMail = "";
      this.errorPw = "";
    }
  }
};
</script>

<template>
<div class="container">
  <h1>會員登入</h1>
  <div class="layout-form">
    <form action="" @submit.prevent="login">
      <div class="form-group" :class="{error: validation.hasError('email')}">
        <div class="label">E-mail</div>
        <div class="content">
          <input type="text" class="form-control" v-model="email" @focus="resetErrMsg" />
        </div>
        <div class="message">{{ validation.firstError('email') }}{{errorMail}}</div>
      </div>
      
      <div class="form-group" :class="{error: validation.hasError('password')}">
        <div class="label">密碼</div>
        <div class="content">
          <input type="password" class="form-control" v-model="password" @focus="resetErrMsg" />
        </div>
        <div class="message">{{ validation.firstError('password') }}{{errorPw}}</div>
      </div>
      
      <div class="form-group">
        <div class="actions">
          <button type="submit" class="btn btn-primary">登入</button>
        </div>
      </div>
    </form>
  </div>
  <div>
    <router-link :to="{name:'register'}" replace>註冊</router-link>
  </div>
  <div>
    <a href="">忘記密碼</a>
  </div>
  
</div>
</template>
