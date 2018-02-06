<script>
var firebase = require("firebase");

export default {
  data() {
    return {
      email: "",
      name: "",
      pw: "",
      comfirmPw: ""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("User is signed in.", user);
      } else {
        console.log("User is not logined yet.");
      }
    });
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.pw)
        .then(function() {
          console.log("sucess");
        })
        .catch(function(error) {
          // Handle Errors here.

          console.log(error.message, error.code);
          switch (error.message) {
            case "The password must be 6 characters long or more.":
              console.log("密碼需多於六個字元");
              break;
            case "Password should be at least 6 characters":
              console.log("密碼需多於六個字元");
              break;
            case "The email address is already in use by another account.":
              console.log("此帳號已被註冊");
              break;
          }
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>

<template>
  <div class="container">
    <h1>會員註冊</h1>
    <form class="register_form" action="" @submit.prevent="register">
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="example@gmail.com" v-model="email">
      <label for="name">暱稱</label>
      <input type="text" id="name" placeholder="請輸入暱稱" v-model="name">
      <label for="pw">密碼</label>
      <input type="password" id="pw" placeholder="密碼長度需多於6字元" v-model="pw">
      <label for="comfirm_pw">確認密碼</label>
      <input type="password" id="comfirm_pw" placeholder="請再次輸入密碼" v-model="comfirmPw">
      <button type="submit">送出</button>
    </form>
    <button @click="signOut">登出</button>
  </div>
</template>

<style lang="scss" scoped>
.register_form {
  label,
  input {
    display: block;
  }
}
</style>
