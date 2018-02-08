<template>
  <div class="container">
    <div class="banner"></div>
    <h1>店家名稱</h1>
    {{this.$route.params.store_id}}
      <ul>
        <li v-for="menu in menus" :key="menu.id"><div class="dishName">{{menu.name}}</div><div class="dishPrice">{{menu.price}}</div></li>
      </ul>
      <p>外送條件：滿{{storeInfo.orderIn.count}}{{storeInfo.orderIn.unit}}可外送</p>
      <p>營業時間：{{storeInfo.time.start}}~{{storeInfo.time.end}}</p>
      <p>地址：台中市北區美德街</p>
      <p>電話：{{storeInfo.tel.block}}-{{storeInfo.tel.num}}</p>
      <br>
      <p>開團截止時間: 開團半小時後截止</p>
      <router-link :to="{
        name:'order',
        params: { storeId: this.storeId, orderId: this.orderId}
      }" @click.native="openTeamOrder" class="open-team-order">
        我要團購
      </router-link>
  </div>
</template>
<script>
import config from "../config";
const firebase = require("firebase");
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const store = firebase.database().ref("store");
const order = firebase.database().ref("order");

export default {
  props: ["storeId"],
  data() {
    return {
      orderId: "",
      storeInfo: "",
      menus: [],
      menusDetail: [],
      orderData: {}
    };
  },
  created() {
    const self = this;
    const storeId = this.storeId;
    store.child(storeId).once("value").then(function(snapshot) {
      // console.log(snapshot.val());
      self.storeInfo = snapshot.val();
      // console.log(self.storeInfo);
    });
    store.child(storeId).child("menus").once("value").then(function(snapshot) {
      // console.log(snapshot.val());
      self.menusDetail = snapshot.val();

      snapshot.forEach(function(data) {
        self.menus.push(data.val());
      });
    });
    // console.log(self.menus);
  },
  methods: {
    openTeamOrder() {
      const self = this;
      const storeId = self.storeId;
      const storeInfo = self.storeInfo;
      self.orderId = order.child(storeId).set({
        "result": {
          "total": 200,
          "users": {
            "userID": {
              "id": "userID",
              "total": 200,
              "name": "user.displayName",
              "mark": "",
              "order": {
                "menuID": {
                  "count": 2,
                  "name": "玉米濃湯麵",
                  "price": 100,
                  "total": 200,
                  "options": [{ "name": "烏龍麵" }, { "name": "加辣" }]
                }
              }
            }
          }
        }
      }).key;
      const orderId = self.orderId;
      order.child(storeId).update(storeInfo);

    }
  }
};
</script>
<style lang="scss" scoped>
ol, ul {
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
.open-team-order {
  background: #ff7044;
  font-size: 13px;
  padding: 12px 74px;
  border-radius: 15px;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}
</style>
