<template>
  <div>
    首頁
    <button @click="signOut">登出</button>
  </div>
</template>

<script>
var firebase = require("firebase");

export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.displayName = user.displayName;
        console.log("User is signed in.");
      } else {
        this.$router.push({
          name: "login"
        });
        console.log("User is not logined yet.");
      }
    });
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        });
      // .catch(function(error) {
      //   // An error happened.
      // });
    }
  }
};
</script>
