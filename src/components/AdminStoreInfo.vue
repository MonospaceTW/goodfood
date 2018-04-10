<template>
  <div class="container" :style="{backgroundImage:`url(${img})`}">
    <div class="content">
      <h1>{{storeInfo.name}}</h1>
      <admin-menu :store-id="parentStoreId"></admin-menu>
    </div>
    <footer-component></footer-component>
  </div>

</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";
import adminMenu from "./AdminMenu";
import footerComponent from "./Footer";
import axios from "axios";

const moment = require("moment");
moment().format();

const store = FirebaseManager.database.ref("store");
const order = FirebaseManager.database.ref("order");

export default {
  props: ["storeId"],
  components: {
    adminMenu,
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
      parentStoreId: this.$props.storeId
    };
  },
  created() {
    const self = this;
    const storeId = self.storeId;
    // console.log(this.parentStoreId);

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
  },
  mounted() {
    const self = this;
    const storeId = self.storeId;
    store
      .child(storeId)
      .child("menus")
      .on("value", snapshot => {
        this.menus = snapshot.val();
      });
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

      const shareUrl = `
        ${window.location.protocol}//${window.location.host}/#/order/${
        self.orderId
      }/${self.storeId}`;

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
          channel: "#test-bot",
          botname: "訂便當小助手"
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
    },
    removeMenu($event, key) {
      const self = this;
      const storeId = self.storeId;

      let removeMenus = self.removeMenus;

      /* click remove icon for remove menu */
      // store
      //   .child(storeId)
      //   .child("menus")
      //   .child(key)
      //   .remove();

      /* click remove icon to add  menu to localstorage for remove menu from firebase */
      removeMenus.push(key);

      localStorage.setItem("removeMenuKeys", JSON.stringify(removeMenus));
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../scss/_color.scss";
@import "../scss/index.scss";
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
  overflow: hidden;
}

.content {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 42px;
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
  height: 22px;
  line-height: 22px;
  margin-bottom: 50px;
}
</style>
