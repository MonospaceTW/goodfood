<template>
  <div class="container" :style="{backgroundImage:`url(${img})`}">
    <div class="content">
      <!-- <div class="banner"></div> -->
      <h1>{{storeInfo.name}}</h1>
      <ul>

        <!-- v-for 渲染 menus -->
        <li v-for="menu in menus" :key="menu.id">
          <div class="dishName">{{menu.name}}</div>
          <div class="dishPrice">${{menu.price}}</div>
        </li>
        <!-- ************************************* -->

        <li>
          <p class="endTime">開團後半小時截止</p>
        </li>
      </ul>

      <div class="storeInfo">
        <p>滿{{storeInfo.orderIn.count}}{{storeInfo.orderIn.unit}}可外送</p>
        <p>營業時間：{{storeInfo.time.start}}~{{storeInfo.time.end}}</p>
        <p>地址：{{storeInfo.address}}</p>
        <p id="lastInfo">電話：{{storeInfo.tel.block}}-{{storeInfo.tel.num}}</p>
      </div>
      <a href="#" class="open-team-order" @click.prevent="openTeamOrder">
        我要團購
      </a>
    </div>
    <footer-component></footer-component>
  </div>

</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";
import footerComponent from "./footer";
import axios from "axios";

const moment = require("moment");
moment().format();

const store = FirebaseManager.database.ref("store");
const order = FirebaseManager.database.ref("order");

export default {
  props: ["storeId"],
  components: {
    footerComponent
  },
  data() {
    return {
      img: require("@/assets/images/menu.jpeg"),
      orderId: "",
      orderEndTime: "",
      storeInfo: {
        address: "台中市北區美德街",
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
        },
        endTime: ""
      },
      storeInfoAll: [],
      menus: []
    };
  },
  created() {
    const storeId = this.storeId;

    checkAuth
      .checkAuth()
      .then(userInfo => {
        this.uid = userInfo.uid;
        this.displayName = userInfo.displayName;
      })
      .catch(() => {
        this.$router.push({
          name: "login"
        });
      });

    /* 
      撈取店家資訊，
      並將撈取後的資料存到 data 中的 storeInfo 。 
    */
    store
      .child(storeId)
      .once("value")
      .then(snapshot => {
        // console.log(snapshot.val());
        this.storeInfo = snapshot.val();
        // console.log(self.storeInfo);
      });

    /* 
      將店家的菜單逐筆加入 data 中的 menus 中，
      以便在 template 中使用 v-for 渲染菜單列表。 
    */
    store
      .child(storeId)
      .child("menus")
      .once("value")
      .then(snapshot => {
        // console.log(snapshot.val());
        snapshot.forEach(data => {
          this.menus.push(data.val());
        });
      });
    // console.log(self.menus);
  },
  methods: {
    /* 
      開起新的訂單，
      這邊先把這次團訂的 order key 指定給 orderId 以便後續的操作，
      
    */
    openTeamOrder() {
      const self = this;
      const storeId = self.storeId;
      const storeInfo = self.storeInfo;
      self.orderId = order.child(storeId).push().key; // 存取 order key 給 data 中的 orderId
      const orderId = self.orderId;
      const now = new Date(); // 將目前的時間指定給 now

      /*
        將截止時間加進此筆訂單:
          1.透過 moment.js 將時間格式化便加上 30分鐘後，
          2.將 data 中的 orderEndTime 更新到 database 中此筆訂單。
      */
      self.orderEndTime = moment(now)
        .add(30, "m")
        .format("HH:mm");
      storeInfo.endTime = self.orderEndTime;

      /*
        將店家資訊加進 database 中的 order 裡，
        以便後續取用店家資訊。
      */
      order
        .child(orderId)
        .child(storeId)
        .update(storeInfo);
      /* eslint-disable */
      const shareUrl = `
        ${window.location.protocol}//${window.location.host}/#/order/${
        self.orderId
      }/${self.storeId}`;
      /* eslint-enable */
      self.toSlackBot(shareUrl, self.storeInfo.name, self.storeInfo.endTime);

      // 切換路由到 order component
      self.$router.push({
        name: "order",
        params: {
          storeId: self.storeId,
          orderId: self.orderId,
          storeName: self.storeInfo.name
        }
      });
    },
    toSlackBot(shareUrl, storeName, endTime) {
      axios({
        method: "post",
        url: "https://goodfood-beta.trunksys.com/message",
        data: {
          // message: "<!here|here> 測試",
          message: `<!here|here> ${storeName}團訂 ${endTime} 截止 ${shareUrl}`,
          // message: "測試",
          channel: "#general",
          botname: "訂便當小助手",
          iconurl: "https://goodfood-main.firebaseapp.com/static/logo.png"
        },
        headers: { Authorization: "test" }
      })
        .then(function(response) {
          console.log(response.data); // {ok: true} will print
          alert("團訂訊息已發送至slack");
        })
        .catch(function(error) {
          console.log(error);
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: no-repeat;
  background-size: contain;
}

.content {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  padding-left: 0;
  width: 77.6%;
  // align-self: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  border-radius: 14px;
  background: #ffffff;
  padding: 25px 11px 0px 14px;
  margin: 63px 0 43px 0;
}
h1 {
  margin-top: 101px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 60px;
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
