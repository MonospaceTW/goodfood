<template>
  <div class="container">
    <div class="banner"></div>
    <h1>店家名稱</h1>
    {{this.$route.params.store_id}}
      <ul>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
        <li><div class="dishName">招牌便當</div><div class="dishPrice">$70</div></li>
      </ul>
      <p>外送條件：滿200原可外送</p>
      <p>營業時間：08:00 ~ 20:00</p>
      <p>地址：台中市北區美德街</p>
      <p>電話：04-22221111</p>
      <br>
      <p>開團截止時間: 開團半小時後截止</p>
      <router-link :to="{
        name:'order',
        params: { store_id: this.store_id, order_id: this.order_id}
      }" @click="teamOrder" class="temaOrderBtn">
        我要團購
      </router-link>
  </div>
</template>
<script>
export default {
  props: ["store_id"],
  data() {
    return {
      order_id: "order_id"
    };
  },
  methods: {
    teamOrder() {}
  }
};
</script>
<style lang="scss" scoped>
// @import "../scss/_color.scss";
@import url("https://fonts.googleapis.com/css?family=Noto+Sans");
ol,
ul {
  list-style: none;
}
.container {
  // font-size: 16px;
  font-family: "Noto Sans", sans-serif;
  background: url(../assets/images/menu.jpeg) no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

ul {
  padding-left: 0;
  width: 65%;
  align-self: center;
  box-shadow: 0 5px 8px 3px #e2e2e2;
  border-radius: 15px;
  background: #fff;
  padding: 2px 25px 20px 25px;
  margin: 60px 40px;
}
h1 {
  font-size: 16px;
  margin-top: 30%;
  color: white;
  letter-spacing: 3px;
}
li {
  padding: 10px 0 5px 10px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
}
p {
  margin-top: 0;
}
.temaOrderBtn {
  background: #ff7044;
  font-size: 13px;
  padding: 12px 74px;
  border-radius: 15px;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}
</style>
