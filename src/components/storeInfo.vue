<template>
  <div class="container">
    <div class="banner"></div>
    <h1>{{storeInfo.name}}</h1>

      <ul>

        <!-- v-for 渲染 menus -->
        <li v-for="menu in menus" :key="menu.id">
          <div class="dishName">{{menu.name}}</div>
          <div class="dishPrice">${{menu.price}}</div>
        </li>
        <!-- ************************************* -->

        <li>
          <p  class="endTime">開團後半小時截止</p>
        </li>
      </ul>

      <div class="storeInfo">
        <p>滿{{storeInfo.orderIn.count}}{{storeInfo.orderIn.unit}}可外送</p>
        <p>營業時間：{{storeInfo.time.start}}~{{storeInfo.time.end}}</p>
        <p>地址：台中市北區美德街</p>
        <p id="lastInfo">電話：{{storeInfo.tel.block}}-{{storeInfo.tel.num}}</p>
      </div>

      <router-link
        class="open-team-order"
        :to="{
          name: 'order',
          params: {
            storeId: this.storeId,
            orderId: this.orderId,
            storeName: this.storeInfo.name
          },
        }"
        @click.native="openTeamOrder"
      >
        我要團購
      </router-link>

      <footer-component></footer-component>

  </div>
</template>
<script>
import footerComponent from "./footer";
import config from "../config";
const firebase = require("firebase");

// #TOFIX: 已經在 Vue Cli 程式進入點 main.js 中進行過判斷與 initializeApp ，
//         但是在這邊沒有進行 initializeApp 在 Console 中會出現 firebase 錯誤訊息。
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const store = firebase.database().ref("store");
const order = firebase.database().ref("order");

export default {
  props: ["storeId"],
  components: {
    footerComponent
  },
  data() {
    return {
      orderId: "",
      storeInfo: {
        orderIn: {
          count: 0,
          unit: 0
        },
        time: {
          start: 0,
          end: 0
        },
        tel: {
          block: 0,
          num: 0
        }
      },
      storeInfoAll: [],
      menus: []
    };
  },
  created() {
    const self = this;
    const storeId = this.storeId;
    store
      .child(storeId)
      .once("value")
      .then(function(snapshot) {
        // console.log(snapshot.val());
        self.storeInfo = snapshot.val();
        // console.log(self.storeInfo);
      });
    store
      .child(storeId)
      .child("menus")
      .once("value")
      .then(function(snapshot) {
        // console.log(snapshot.val());
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
      self.orderId = order.child(storeId).push().key;
      const orderId = self.orderId;
      order
        .child(orderId)
        .child(storeId)
        .update(storeInfo);
      self.$router.push({
        name: "order",
        params: {
          storeId: this.storeId,
          orderId: this.orderId,
          storeName: this.storeInfo.name
        }
      });
    }
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
img {
  max-width: 100%;
  height: auto;
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
  width: 80%;
  align-self: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  border-radius: 14px;
  background: #ffffff;
  padding: 25px 11px 0px 14px;
  margin: 63px 0 43px 0;
}
h1 {
  margin-top: 27.9%;
  margin-bottom: 0;
  font-family: MicrosoftJhengHei;
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 3.5px;
  text-align: left;
  color: #ffffff;
}
li {
  padding: 0 0 25px 0;
  // border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
}
li:nth-last-child(n) {
  padding: 0 0 12px 0;
}
.endTime {
  font-family: MicrosoftJhengHei;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  text-align: left;
  color: #f75454;
  margin-bottom: 0;
}
.storeInfo {
  width: 44.5%;
  margin: 0 27.5%;
}
.storeInfo p {
  font-family: Arial;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2px;
  text-align: center;
  color: #000000;
  margin-bottom: 7px;
}
#lastInfo {
  margin-bottom: 0;
}
p {
  margin-top: 0;
}
.open-team-order {
  border-radius: 21px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  border: solid 1px #f8a654;
  height: 6.9%;
  padding: 13px 38px 13px 38px;
  margin-top: 39px;
  margin-bottom: 40px;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 4px;
  text-align: left;
  color: #f8a654;
  text-decoration: none;
}
</style>
