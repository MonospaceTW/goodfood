<script>
/* eslint-disable */

import FirebaseManager from "@/utils/FirebaseManager";
import ConfirmOrder from "./ConfirmOrder";
import checkAuth from "@/checkAuth";
import lodashfp from "lodash/fp";

export default {
  props: ["storeId", "orderId"],
  data() {
    return {
      uid: "",
      displayName: "",
      mark: "",
      user: {},
      thisOrder: [],
      ConfirmOrder: false,
      storeName: "",
      dishes: {},
      hideLightbox: true
    };
  },
  components: {
    ConfirmOrder
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
          name: "login",
          query: { orderId: this.orderId, storeId: this.storeId }
        });
      });

    let route = `order/${this.orderId}/${this.storeId}`;
    FirebaseManager.getValue(route).then(store => {
      this.storeName = store.name;

      let menu = store.menus;
      for (let id in menu) {
        menu[id].count = 0;
      }
      //  深層複製物件以確保更新Vue的observer
      this.dishes = lodashfp.cloneDeep(menu);
      console.log(this.dishes);
    });
  },
  methods: {
    add(id) {
      this.dishes[id].count += 1;
    },
    subtract(id) {
      if (this.dishes[id].count >= 1) {
        this.dishes[id].count -= 1;
      }
    },
    subtotal(id) {
      let dish = this.dishes[id];
      dish.total = dish.count * dish.price;
      return dish.total;
    },

    order() {
      let dishes = this.dishes;
      this.thisOrder = {};
      for (let i in dishes) {
        if (dishes[i].count >= 1) {
          this.thisOrder[i] = dishes[i];
          console.log(this.thisOrder[i]);
        }
      }

      let user = {};
      user.id = this.uid;
      user.name = this.displayName;
      user.total = this.total;
      user.mark = this.mark;
      user.order = this.thisOrder;
      this.user = JSON.parse(JSON.stringify(user));

      this.ConfirmOrder = true;
      console.log(this.thisOrder);
    },
    cancelOrder() {
      this.ConfirmOrder = false;
    },
    closeBox() {
      this.hideLightbox = true;
    },
    showLightbox() {
      this.hideLightbox = false;
    }
  },
  computed: {
    total() {
      let subtotal = [];
      for (let i in this.dishes) {
        if (this.dishes[i].count >= 1) {
          subtotal.push(this.dishes[i].count * this.dishes[i].price);
        }
      }
      // console.log(subtotal);
      let total = subtotal.reduce(function(previousVal, currentVal) {
        return previousVal + currentVal;
      }, 0);
      return total;
    }
  }
};
</script>

<template>
<div class="container_lightbox">
<div class="container">
  <confirm-order 
    v-show="ConfirmOrder" 
    :user="user" 
    :orderId="orderId" 
    :storeId="storeId" 
    :uid="uid" 
    @cancelOrder="cancelOrder"
  ></confirm-order>
  <h1 class="store_name">{{storeName}}</h1>
  <ul>
    <li class="item" v-for="(dish,id) in dishes" v-bind:key="id">
      <div class="menu">
        <div class="menu_name">{{dish.name}}</div>
        <div class="price">${{dish.price}}</div>
      </div>
      <div class="menu">
        <div class="counter">
          <button class="subtract" @click="subtract(id)">-</button>
          <div class="count">{{dish.count}}</div>
          <button class="add" @click="add(id)">+</button>
        </div>
        <div class="subtotal">${{subtotal(id)}}</div>
      </div>
    </li>
  </ul>
  <div class="total">
    <span>總計</span>＄{{total}}</div>
  <div class="name">
    我是{{displayName}}
  </div>
  <div class="btn_group">
    <!-- 備註：<input type="text" v-model="mark"></div> -->
    <a class="order_btn" href="#" @click="order">下訂單</a>
    <router-link 
    class="result_btn" 
    :to="{
      name:'result',
      params: { storeId: this.storeId, orderId: this.orderId}
      }">看團訂結果</router-link>
    <a class="share_btn" href="#" @click="showLightbox">分享這頁</a>
    
 

</div>
 </div>
  <!-- 分享lightbox -->
        <div class="lightbox" @click="closeBox" :class="{hide:hideLightbox}">
          <div class="msg">
            <div class="close" @click="closeBox">x</div>
            <div class="boxtitle">邀請大家來團訂吧！</div>
            <!-- Go to www.addthis.com/dashboard to customize your tools -->
            <div class="addthis_inline_share_toolbox"></div>
          </div>
        </div>
</div>
</template>


<style lang="scss" scoped>
@import "../scss/index.scss";

a {
  color: $orange;
  text-decoration: none;
}

li {
  list-style: none;
}

.container {
  width: 90%;
  font-size: 14px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
  position: relative;
}

.store_name {
  margin-bottom: 24px;
  font-size: 17px;
  text-align: center;
}

.item {
  padding: 10px;
  margin: 10px 0;
  border-radius: 15px;
  background-color: $gray_one;
}

.menu,
.counter {
  padding: 6px 6px 6px 0;
  display: flex;
  justify-content: space-between;
}

.subtract,
.add {
  width: 20px;
  height: 23px;
  padding-right: 15px;
  color: $orange;
  border: $orange 1px solid;
  border-radius: 50%;
  background-color: $gray_one;
}

.count {
  padding: 0 8px;
  margin: 0 10px;
  line-height: 20px;
  background-color: white;
}

.btn_group {
  display: flex;
  justify-content: space-around;
}

.order_btn,
.result_btn,
.share_btn {
  display: block;
  margin: 0 6px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px $orange solid;
  border-radius: 30px;
}

.total {
  text-align: right;
  span {
    color: $blue;
  }
}

.name {
  padding: 20px 0;
}

.lightbox {
  // display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.lightbox .msg {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  width: 60%;
  margin: auto;
  height: 100px;
  background-color: white;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}

.lightbox .msg .boxtitle {
  font-size: 1.1rem;
  margin: 10px;
}

.lightbox .msg .close {
  position: absolute;
  top: -5px;
  right: 0;
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
}

.hide {
  display: none;
}
</style>
