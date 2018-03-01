<script>
import FirebaseManager from "@/utils/FirebaseManager";
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
          // var auth = firebase.auth();
          var emailAddress = this.email;
          // var actionCodeSettings = {
          //   url: "http://localhost:8080/#/storelist"
          // };
          FirebaseManager
            // .sendPasswordResetEmail(emailAddress, actionCodeSettings)
            .sendPasswordResetEmail(emailAddress)
            .then(() => {
              console.log("重設密碼信已寄出");
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
          this.errorMsg = "查無此帳號";
          break;
        case "auth/invalid-email":
          this.errorMsg = "E-mail格式錯誤";
          break;
        case "auth/user-disabled":
          this.errorMsg = "此帳號已停用";
          break;
        default:
          this.errorMsg = "發生錯誤，請再試一次";
      }
    },
    resetErrMsg() {
      this.errorMsg = "";
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
  <h1 class="forgotpw_title">重設密碼</h1>
  <div class="layout-form">
    <form action="" @submit.prevent="sendPasswordResetEmail">
      <div class="form-group" :class="{error: validation.hasError('email')}">
        <div class="label">E-mail</div>
        <div class="content">
          <input type="text" class="form-control" v-model="email"  @focus="resetErrMsg" />
        </div>
        <div class="message">{{ validation.firstError('email') }}{{errorMsg}}</div>
      </div>
      <div class="form-group">
        <div class="actions">
          <button type="submit" class="btn">送出</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "../scss/index.scss";

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

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  font-size: 14px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
}

.forgotpw_title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 47px;
}

.actions {
  display: flex;
  justify-content: center;
}

.btn {
  display: block;
  width: 120px;
  height: 40px;
  margin: 17px 0 0;
  color: $orange;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border: 1px $orange solid;
  border-radius: 30px;
  background-color: white;
}

.form-control {
  display: inline-block;
  width: 230px;
  height: 25px;
  margin-top: 10px;
  border-style: none;
  border-bottom: 2px solid #e0dfdf;
}
.message {
  color: $red;
  font-size: 12px;
  margin-top: 6px;
  margin-bottom: 20px;
}
</style>
