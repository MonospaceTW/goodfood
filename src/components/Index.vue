<template>
  <div>
    首頁
    <router-link class="storelist" :to="{name:'storelist'}">店家列表</router-link>
    <button @click="signOut">登出</button>
  </div>
</template>

<script>
import FirebaseManager from "@/utils/FirebaseManager";

export default {
  created() {
    // FirebaseManager.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.uid = user.uid;
    //     this.displayName = user.displayName;
    //     console.log("User is signed in.");
    //   } else {
    //     this.$router.push({
    //       name: "login"
    //     });
    //     console.log("User is not logined yet.");
    //   }
    // });
  },
  methods: {
    signOut() {
      FirebaseManager.signOut().then(function() {
        // Sign-out successful.
      });
      // .catch(function(error) {
      //   // An error happened.
      // });
    }
  }
};
</script>


<style scoped>
.storelist {
  display: block;
}
</style>
