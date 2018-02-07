var firebase = require("firebase");

export default {
  checkAuth: function checkAuth() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.displayName = user.displayName;
        console.log("User is signed in.", user);
      } else {
        this.$router.push({
          name: "login"
        });
        console.log("User is not logined yet.");
      }
    });
  }
};
