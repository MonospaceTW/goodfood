<script>
var firebase = require("firebase");
var SimpleVueValidation = require("simple-vue-validator");
var Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "此欄位為必填",
    email: "e-mail格式不符"
  }
});
export default {
  props: [],
  data() {
    return {
      email: "",
      errorMsg: "",
      sentVerify: false
    };
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    email: function(value) {
      return Validator.value(value)
        .required()
        .email();
    }
  },
  methods: {
    sendPasswordResetEmail() {
      this.$validate().then(success => {
        if (success) {
          console.log("Validation succeeded!");
          var auth = firebase.auth();
          var emailAddress = this.email;
          // var actionCodeSettings = {
          //   url: "http://localhost:8080/#/storelist"
          // };
          auth
            // .sendPasswordResetEmail(emailAddress, actionCodeSettings)
            .sendPasswordResetEmail(emailAddress)
            .then(() => {
              console.log("sucess");
              this.sentVerify = true;
            })
            .catch(error => {
              console.log(error.code, error.message);
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
        case "auth/invalid-email":
          this.errorMail = "E-mail格式錯誤";
          break;
        case "auth/user-disabled":
          this.errorMail = "此帳號已停用";
          break;
        default:
          this.errorMail = "發生錯誤，請再試一次";
      }
    }
  }
};
</script>

<template>
<div class="container">
  <div class="sent_verify" :class="{show: sentVerify}">
    <div>重設密碼信已寄出</div>
    <router-link :to="{name:'storelist'}">回到首頁</router-link>
  </div>
  <h1>忘記密碼</h1>
  <div class="layout-form">
    <form action="" @submit.prevent="sendPasswordResetEmail">
      <div class="form-group" :class="{error: validation.hasError('email')}">
        <div class="label">E-mail</div>
        <div class="content">
          <input type="text" class="form-control" v-model="email" />
        </div>
        <div class="message">{{ validation.firstError('email') }}{{errorMsg}}</div>
      </div>
      <div class="form-group">
        <div class="actions">
          <button type="submit" class="btn btn-primary">送出</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<style lang="scss" scoped>
.sent_verify {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
}

.show {
  display: block;
}
</style>
