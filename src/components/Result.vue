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
        <div class="back-order">
          <router-link
            class="back-order-page"
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
      </div>
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

const fp = require("lodash/fp");

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

    // 將網址上的 orderId (props) 指定給 orderId 變數(常數)
    const orderId = self.orderId;

    // 將網址上的 storeId (props) 指定給 storeId 變數(常數)
    const storeId = self.storeId;

    /* 
      將撈取到的 users 透過 loadash 轉成新的物件，
      便將新的物件指定 data 裡的 users，
      以便在 template 中使用 v-for 渲染訂單明細。
    */
    // 將預撈取的 users 在 database 中的路徑指定給 usersRoute 變數
    const usersRoute = `order/${orderId}/result/users`;

    function updateUsersValue(snapshot) {
      const value = snapshot.val();
      const newUsers = fp.cloneDeep(value);
      self.users = newUsers;
    }

    // 使用 firebaseManager 的 bindAsyncFunc Method 在有新的訂單時更新訂單明細的畫面顯示
    FirebaseManager.bindAsyncFunc(usersRoute, updateUsersValue);

    /* 
      先撈取每個人訂的所有餐點，
      在透過篩選加總餐點數量，
      最後在計算總金額。
    */
    // 將預撈取的每筆訂單在 database 裡的路徑指定給 orderTotalRoute 變數
    const orderTotalRoute = `order/${orderId}/result/users`;

    function updateTotalOrder(snapshot) {
      self.totalOrder = "";
      snapshot.forEach(function(data) {
        data.child("order").forEach(function(newData) {
          const value = newData.val();

          const result = {
            name: value.name,
            count: value.count,
            price: value.price
          };

          // 將餐點重複訂購狀態預設值設為 false
          let isSameOrder = false;

          /* 
            透過 forEach 檢查每筆要進行合併的各項餐點，
            如果名稱重複則只增加餐點數量。
          */
          self.totalOrder.forEach(function(order) {
            // 判斷餐點名餐是否已存在，如果有只加總數量
            if (order.name === result.name) {
              isSameOrder = true; // 如果餐點名稱重複則將餐點重複訂購狀態改為 true
              order.count += result.count;
            }
          });

          /* 
            將餐點重複訂購狀態取反值，確保沒有重複新增餐點，
            如果沒有重複則將 result 加進 data 的 totalOrder。
          */
          if (!isSameOrder) {
            self.totalOrder.push(result); // 將整理好的整體訂單推進 data 裡的 totalOrder 以便取用資料
          }

          // 將每個使用者的訂單加進 usersTotal 以便計算總計額
          self.usersTotal.push(value);
        });
      });
      // 計算本次團訂的的總金額，並將總金額指定給 data 裡的 totalPrice
      self.totalPrice = self.usersTotal.reduce((acc, cur) => {
        return acc + cur.price * cur.count;
      }, 0);
    }

    // 透過 FirebaseManager 的 bindAsyncFunc Method 來更新總訂單的畫面顯示
    FirebaseManager.bindAsyncFunc(orderTotalRoute, updateTotalOrder);

    /* 
      撈取店家資訊，
      以便在 template 中渲染店家資訊。
    */
    // 將預撈取的店家資訊 database 路徑指定給 storeRoute 變數
    const storeRoute = `order/${orderId}/${storeId}`;

    // 透過 FirebaseManger 的 getValue Method 來撈取店家資訊
    FirebaseManager.getValue(storeRoute).then(function(store) {
      self.storeInfo = fp.cloneDeep(store);
    });
  },
  methods: {
    /* 
      點擊返回訂購頁的按鈕會觸發 backOrder Method ，
      透過 $router.push 的方法能夠返回訂購頁，
      可將需要的參數加進 params 裡。
    */
    backOrder() {
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
  margin: 37px 26px 0 26px;
  text-align: center;
  font-size: $font-m;
  color: $gray_two;
  min-height: calc(100vh - 84px);
  display: flex;
  flex-direction: column;
}
.result_title {
  font-size: $font-xl;
  color: $black;
  letter-spacing: 4px;
  height: 27px;
  line-height: 27px;
  margin-bottom: 5px;
}

hr {
  width: 99%;
  border: solid 0.5px $white;
  margin: 0;
}

.result_subtitle {
  font-size: $font-l;
  height: 21px;
  line-height: 21px;
  margin: 20px 0 8px 0;
}
.result_info {
  font-size: $font-s;
  line-height: 16px;
  margin-bottom: 11px;
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
  margin: 0px 0 12px 0;
}
.listtop_1,
.listtop_2 {
  font-size: $font-l;
  border-bottom: 1px solid $white;
  border-top: 1px solid $white;
  padding: 4px 0;
  height: 24px;
  line-height: 24px;
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
  display: flex;
  justify-content: center;
}
.back-order-page {
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
