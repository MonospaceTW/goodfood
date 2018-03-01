<template>
<div>
<div class="container">
    <h1 class="result_title">團訂結果</h1>
    <hr />
    <div class="result_subtitle">{{storeInfo.name}}</div>
    <div class="result_info">
        <p>{{storeInfo.mark}}</p>
        <p>營業時間:{{storeInfo.time.start}}-{{storeInfo.time.end}}</p>
        <p>地址：{{storeInfo.address}}</p>
        <p>電話：{{storeInfo.tel.block}}-{{storeInfo.tel.num}}</p>
    </div>
        <div class="deadline">截止時間：{{storeInfo.endTime}}</div>
        <!-- <div class="result_btn">返回訂購頁</div> -->
        <router-link
          class="back-order"
          :to="{
            name: 'order',
            params: {
              storeId: this.storeId,
              orderId: this.orderId,
              storeName: this.storeInfo.name
            },
          }"
          @click.native="backOrder"
       >
        返回訂購頁
      </router-link>
        <div class="listtop_2">訂單明細</div>

      <div class="order-detail-list">
        <div class="user" v-for=" (userValue, userKey) in users" :key="userKey.id">
          <div class="user-name">{{userValue.name}}</div>
          <div class="user-order-detail" >
            <div class="order-detail" v-for="(orderValue, orderKey) in userValue.order" :key="orderKey.id">
              <div class="order-food">{{orderValue.name}}</div>
              <div class="order-count">x{{orderValue.count}}</div>
              <div class="order-price">${{orderValue.price * orderValue.count}}</div>
            </div>
          </div>
          <div class="user-mark">{{userValue.mark}}</div>
        </div>
      </div>

        <div class="listtop_1">訂單</div>

        <div class="region_down">
          <div class="row" v-for="item in totalOrder" :key="item.id">
            <div class="item">{{item.name}}</div>
            <div class="count">x{{item.count}}</div>
            <div class="price">${{item.count * item.price}}</div>
          </div>
          <!-- <div class="row">
            <div class="remarks">不要加蔥</div>
            <div class="count"></div>
            <div class="price"></div>
          </div> -->
        </div>

        <hr>

        <div class="row_digital">
            <div>總計</div>
            <div>${{totalPrice}}</div>
        </div>
        
</div>
<footer-component></footer-component>
</div>
</template>
<script>
import footerComponent from "./footer";
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";

const firebase = FirebaseManager.getFirebaselib();

// 載入 lodash
const fp = require("lodash/fp");

// 將 firebase 的 database 方法指定給 db 變數(常數)
const db = firebase.database();

export default {
  props: ["orderId", "storeId"],
  components: {
    footerComponent
  },
  data() {
    return {
      users: [],
      usersTotal: [],
      totalOrder: [],
      totalPrice: "",
      storeInfo: {
        time: {
          start: "10:00",
          end: "19:30"
        },
        tel: {
          block: "04",
          num: "22221111"
        }
      }
    };
  },
  created() {
    const self = this;
    // firebase.auth().signOut(); // 登出

    // 檢查登入狀態
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

    // 將網址上的 orderId 指定給 orderId 變數(常數)
    const orderId = self.orderId;

    // 將網址上的 storeId 指定給 storeId 變數(常數)
    const storeId = self.storeId;

    // 撈取 users 資料
    db
      .ref("order")
      .child(orderId)
      .child("result")
      .child("users")
      .once("value")
      .then(function(snapshot) {
        const newUsers = fp.cloneDeep(snapshot.val()); // 透過 lodash 將撈取到的 users (Promise 物件)轉成另外一個不同的新物件
        self.users = newUsers; // 將新物件指定給 data 的 users
        // console.log(self.users);
      });
    // 撈取 user 裡的 order 訂購細節資料 將每人的訂購清單合併成總訂單
    db
      .ref("order")
      .child(orderId)
      .child("result")
      .child("users")
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(data) {
          data.child("order").forEach(function(newData) {
            const value = newData.val();
            console.log(value);
            // 處裡所有訂單， 將訂單整理成總訂單
            const result = {
              name: value.name,
              count: value.count,
              price: value.price
            };

            // 將餐點重複訂購狀態預設值設為 false
            let isSameOrder = false;

            // 判斷餐點名餐是否已存在，如果有只加總數量
            self.totalOrder.forEach(function(order) {
              if (order.name === result.name) {
                // 如果餐點名稱重複則將餐點重複訂購狀態改為 true
                isSameOrder = true;
                order.count += result.count;
              }
            });

            // 將餐點重複訂購狀態取反值，能夠將餐點新增進整體訂單裡
            // 再將 整理好的整體訂單推進 data 裡的 totalOrder 以便取用資料
            if (!isSameOrder) {
              self.totalOrder.push(result);
            }
            // 將每個使用者定的項目加進 usersTotal
            self.usersTotal.push(value);
          });
        });

        // 計算本次團訂的的總金額，並將總金額指定給 data 裡的 totalPrice
        self.totalPrice = self.usersTotal.reduce((acc, cur) => {
          return acc + cur.price * cur.count;
        }, 0);
      });

    // // 撈取團訂總金額
    // db
    //   .ref("order")
    //   .child(orderId)
    //   .child("result")
    //   .child("total")
    //   .once("value")
    //   .then(function(snapshot) {
    //     // 將從 DB 中撈取到的總金額指定給 data 裡的 totalPrice
    //     self.totalPrice = fp.cloneDeep(snapshot.val());
    //   });

    // 撈取店家資訊
    db
      .ref("order")
      .child(orderId)
      .child(storeId)
      .once("value")
      .then(function(snapshot) {
        self.storeInfo = fp.cloneDeep(snapshot.val());
      });
  },
  methods: {
    backOrder() {
      const self = this;

      // // 將網址上的 orderId 指定給 orderId 變數(常數)
      // const orderId = self.orderId;

      // // 將網址上的 storeId 指定給 storeId 變數(常數)
      // const storeId = self.storeId;

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

<style lang='scss' scoped>
@import "../scss/index.scss";

$font-xl: 18px;
$font-l: 16px;
$font-m: 13px;
$font-s: 12px;

.container {
  margin: 30px 26px 0 26px;
  text-align: center;
  font-size: $font-m;
  color: $gray_two;
}
.result_title {
  font-size: $font-xl;
  color: $black;
  margin-bottom: 7px;
}

hr {
  border: 0.8px solid $white;
  margin-top: 5px;
}

.result_subtitle {
  font-size: $font-l;
  margin: 30px 0 9px 0;
}
.result_info {
  font-size: $font-s;
  line-height: 16px;
  margin-bottom: 24px;
}
.result_btn {
  display: block;
  width: 130px;
  height: 46px;
  line-height: 46px;
  color: $orange;
  margin: 0 auto 21px;
  text-align: center;
  font-size: $font-m;
  border: 1px solid $btn_primary_border;
  border-radius: 21.5px;
  box-shadow: $box_shadow;
}
.deadline {
  font-size: $font-s;
  color: $red;
  margin: 11px 0 12px 0;
}
.listtop_1,
.listtop_2 {
  font-size: $font-l;
  border-bottom: 1.5px solid $white;
  border-top: 1.5px solid $white;
  padding: 4px 0;
}

.listtop_2 {
  margin-top: 21px;
}
.row {
  display: flex;
  width: 100%;
  line-height: 18px;
  text-align: left;
}
.row_digital {
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  letter-spacing: 2px;
  margin-top: 3px;
  margin-bottom: 13px;
}

.region_down {
  margin: 1.5% 0.75%;
}

.remarks {
  color: $blue;
  font-size: $font-s;
  margin-top: -10px;
}

.regin {
  line-height: none;
}

.count {
  width: 20%;
}

.price {
  width: 20%;
  text-align: right;
}
.item {
  width: 60%;
  margin-right: 36.5%;
}

.item_2 {
  width: 35%;
}
.name {
  width: 25%;
}
.order-detail-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 1.8%;
  padding-bottom: 2.4%;
}
.user {
  display: flex;
  width: 100%;
  margin-top: 1%;
  flex-wrap: wrap;
}
.user-name {
  display: flex;
  justify-content: flex-start;
  width: 23%;
}
.user-order-detail {
  display: flex;

  flex-wrap: wrap;
  width: 77%;
}
.user-mark {
  display: flex;
  width: 100%;
  margin-left: 23%;
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: $blue;
  font-size: $font-s;
}
.order-detail {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.order-food {
  width: 60%;
  display: flex;
  justify-content: flex-start;
}
.order-count {
  width: 20%;
}
.order-price {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.back-order {
  box-sizing: border-box;
  border-radius: 20px;
  width: 130px;
  height: 46px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px #f8a654;
  padding: 11px 16px 13px 16px;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 3px;
  text-align: center;
  color: #f8a654;
  text-decoration: none;
  display: inline-block;
}
</style>
