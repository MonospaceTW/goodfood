<script>
import FirebaseManager from "@/utils/FirebaseManager";
import footerComponent from "./Footer";

var SimpleVueValidation = require("simple-vue-validator");
var Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "此欄位為必填",
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
      errorPw: "",
      isBtnDisabled: false
    };
  },
  components: {
    footerComponent
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
          this.isBtnDisabled = true;
          FirebaseManager.signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
              const orderId = this.$route.query.orderId;
              const storeId = this.$route.query.storeId;
              if (orderId && storeId) {
                this.$router.push({
                  name: "order",
                  params: { orderId: orderId, storeId: storeId }
                });
              } else {
                this.$router.push({ name: "index" });
              }
            })
            .catch(error => {
              console.log(error.code);
              this.isBtnDisabled = false;

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
      <img src="../assets/images/logo.svg" alt="">
  <div class="logo_title">SET <br>LUNCH</div>
  <div class="layout-form">
    <form action="" @submit.prevent="login">
      <div class="form-group" :class="{error: validation.hasError('email')}">
        <div class="content">
          <div class="label">帳號</div>
          <input type="text" class="form-control input" placeholder="example@gmail.com" v-model="email" @focus="resetErrMsg" />
        </div>
        <div class="message">{{ validation.firstError('email') }}{{errorMail}}</div>
      </div>
      
      <div class="form-group" :class="{error: validation.hasError('password')}">
        <div class="content">
          <div class="label">密碼</div>
          
          <input type="password" class="form-control input" v-model="password" @focus="resetErrMsg" />
        </div>
        <div class="message">{{ validation.firstError('password') }}{{errorPw}}</div>
      </div>
      
      <div class="form-group">
        <div class="actions">
          <button type="submit" :disabled="isBtnDisabled" class="btn login_btn form-control">登入</button>
        </div>
      </div>
    </form>
  </div>
  <div>
    <router-link class="btn" :to="{
      name:'register',
      query: { orderId: this.$route.query.orderId, storeId: this.$route.query.storeId }
      }">註冊</router-link>
  </div>
  <div>
    <router-link class="forgotpw" :to="{name:'forgotpw'}">忘記密碼</router-link>
  </div>
    <footer-component></footer-component>
  
</div>
</template>

<style lang="scss" scoped>
@import "../scss/index.scss";

a {
  text-decoration: none;
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
  position: relative;
}

.logo_title {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: #4a4a4a;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 56px;
}

.form-group {
  .content {
    width: 240px;
    margin: 20px 0 0;
    display: flex;
    // justify-content: space-between;
    border-bottom: 2px solid #e0dfdf;

    .label {
      width: 40px;
    }

    .input {
      flex-grow: 2;
      border-style: none;
    }
  }

  .message {
    margin: 6px 0;
    font-size: 12px;
    color: $red;
  }

  .actions {
    padding-top: 60px;
    .login_btn {
      margin: 0 auto;
    }
  }
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

.forgotpw {
  display: block;
  margin: 20px 0;
  color: $dark_orange;
}
</style>
