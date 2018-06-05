<script>
import checkAuth from "@/checkAuth";
import footerComponent from "./Footer";

export default {
  data() {
    return {
      userInfo: {}
    };
  },
  components: {
    footerComponent
  },
  created() {
    checkAuth
      .checkAuth()
      .then(info => this.updateUserInfo(info))
      .catch(error => {
        console.log(error);
        this.$router.push({
          name: "login"
        });
      });
  },
  methods: {
    updateUserInfo({ uid, displayName }) {
      this.$set(this.userInfo, "uid", uid);
      this.$set(this.userInfo, "displayName", displayName);
    }
  }
};
</script>

<template>
<div class="container">
  <div class="wrapper">
    <div class="title">Hi, {{userInfo.displayName}}</div>
    <div class="title">請先登入Monospace slack</div>
    <a class="btn" target="_blank" v-bind:href="'https://slack.com/oauth/authorize?client_id=244526419584.320607325620&scope=read&state=' + userInfo.uid">綁定slack</a>
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
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  // padding-top: 30%;

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
.title {
  text-align: center;
  width: 100%;
}
.btn {
  display: block;
  width: 120px;
  height: 40px;
  margin: 30px 0 0;
  color: $orange;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border: 1px $orange solid;
  border-radius: 30px;
  background-color: white;
}
</style>
