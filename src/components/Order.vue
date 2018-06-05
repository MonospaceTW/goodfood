<script>
/* eslint-disable */

import FirebaseManager from "@/utils/FirebaseManager";
import ConfirmOrder from "./ConfirmOrder";
import checkAuth from "@/checkAuth";
import lodashfp from "lodash/fp";
import footerComponent from "./Footer";
import ClipboardJS from "clipboard";
new ClipboardJS(".copy_btn", {
  text: function() {
    return window.location.href;
  }
});
export default {
  props: ["storeId", "orderId"],
  data() {
    return {
      userInfo: {},
      mark: "",
      user: {},
      thisOrder: [],
      ConfirmOrder: false,
      storeName: "",
      endTime: "",
      dishes: {},
      hideLightbox: true,
      tooltip_opacity: 0
    };
  },
  components: {
    ConfirmOrder,
    footerComponent
  },
  created() {
    checkAuth
      .checkAuth()
      .then(info => this.updateUserInfo(info))
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
      this.endTime = store.endTime;
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
    updateUserInfo({ uid, displayName }) {
      this.$set(this.userInfo, "uid", uid);
      this.$set(this.userInfo, "displayName", displayName);
    },
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
      this.showTooltip();
    },
    showTooltip() {
      this.tooltip_opacity = 100;
      setTimeout(() => {
        this.tooltip_opacity = 0;
      }, 2000);
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
    },
    location() {
      return window.location.href;
    }
  }
};
</script>

<template>
  <div class="container">
    <confirm-order v-show="ConfirmOrder" :user="user" :orderId="orderId" :storeId="storeId" :uid="uid" @cancelOrder="cancelOrder"></confirm-order>
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
      我是{{userInfo.displayName}}
    </div>
    <div class="btn_group">
      <!-- 備註：<input type="text" v-model="mark"></div> -->
      <router-link class="result_btn" :to="{
        name:'result',
        params: { storeId: this.storeId, orderId: this.orderId}
        }">看團訂結果</router-link>
      <div 
        class="share_btn copy_btn" 
        @click="showLightbox" 
        data-clipboard-text="">
        分享這頁
      </div>
      <a class="order_btn" href="#" @click="order">下訂單</a>

    </div>
    <!-- 分享lightbox -->
    <div class="lightbox" :class="{hide:hideLightbox}">
      <div class="msg">
        <div class="close" @click="closeBox">x</div>
        <div class="boxtitle">邀請大家來團訂吧！</div>
        <div class="flex copy_location" >
          <div id="location" class="location">{{storeName}}團訂 {{endTime}}截止 {{location}}</div>
          <button class="copy_btn copy_target" @click="showTooltip" data-clipboard-target="#location">
          </button>
        </div>
        <div class="tooltip" :style="{opacity:tooltip_opacity}">網址已複製</div>
      </div>
    </div>
    <footer-component></footer-component>

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
  box-sizing: border-box;
  position: relative;
  width: 100%;
  // min-height: calc(100vh - 47px);
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
  font-size: 14px;
}

.flex {
  display: flex;
}

.store_name {
  margin-bottom: 24px;
  font-size: 17px;
  text-align: center;
}

.item {
  width: 310px;
  padding: 10px;
  margin: 10px auto;
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
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  border: 1px $orange solid;
  border-radius: 30px;
  color: $orange;
  background-color: white;
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
  position: fixed;
  bottom: calc(100vh / 2 - 50px);
  left: 0;
  right: 0;
  width: 90%;
  margin: auto;
  height: 150px;
  background-color: white;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}

.lightbox .msg .boxtitle {
  font-size: 1rem;
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

.location {
  width: 90%;
  line-height: 25px;
  overflow: scroll;
  white-space: nowrap;
}
.copy_location {
  border: 2px solid $gray_one;
  border-radius: 10px;
  padding: 3px;
}

.copy_target {
  width: 30px;
  height: 25px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: $gray_one;
  background-image: url(../assets/images/clippy.svg);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}
.tooltip {
  margin: 15px auto;
  width: 100px;
  line-height: 25px;
  background-color: $gray_one;
  font-size: 12px;
  border-radius: 15px;
  color: $gray_two;
  transition: all linear 0.2s;
}
</style>
