<script>
import checkAuth from "@/checkAuth";
import footerComponent from "./Footer";

export default {
  data() {
    return {
      uid: "",
      displayName: ""
    };
  },
  components: {
    footerComponent
  },
  created() {
    checkAuth
      .checkAuth()
      .then(userInfo => {
        this.uid = userInfo.uid;
        this.displayName = userInfo.displayName;
      })
      .catch(error => {
        console.log(error);
        this.$router.push({
          name: "login"
        });
      });
  }
};
</script>

<template>
<div class="container">
    <div class="title">Hi, {{displayName}}</div>
    <div class="title">請先登入Monospace slack</div>
    <a class="btn" v-bind:href="'https://slack.com/oauth/authorize?client_id=244526419584.320607325620&scope=read&state=' + uid">綁定slack</a>
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
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  padding-top: 30%;
}
.title {
  text-align: center;
  width: 100%;
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
</style>
