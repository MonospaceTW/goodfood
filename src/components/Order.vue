<script>
/* eslint-disable */
// var firebase = require('firebase');
import ComfirmOrder from "./ComfirmOrder";

let menu = {
  menuId1: {
    name: "玉米濃湯麵",
    price: 100,
    options: [
      {
        max: 1,
        min: 1,
        chooses: [{ name: "烏龍麵" }, { name: "油麵" }]
      },
      {
        max: 1,
        min: 1,
        chooses: [{ name: "加辣" }, { name: "不加辣" }]
      }
    ]
  },
  menuId2: {
    name: "酸辣麵",
    price: 50,
    options: [
      {
        max: 1,
        min: 1,
        chooses: [{ name: "烏龍麵" }, { name: "油麵" }]
      },
      {
        max: 1,
        min: 1,
        chooses: [{ name: "加辣" }, { name: "不加辣" }]
      }
    ]
  },
  menuId3: {
    name: "水餃",
    price: 50,
    options: [
      {
        max: 1,
        min: 1,
        chooses: [{ name: "烏龍麵" }, { name: "油麵" }]
      },
      {
        max: 1,
        min: 1,
        chooses: [{ name: "加辣" }, { name: "不加辣" }]
      }
    ]
  }
};

export default {
  props: ["storeId", "orderId"],
  data() {
    return {
      // orderId: "orderId",
      // storeId: "storeId",
      displayName: "",
      mark: "",
      user: {},
      thisOrder: [],
      comfirmed: false,
      dishes: {}
    };
  },
  components: {
    ComfirmOrder
  },
  created() {
    for (let id in menu) {
      menu[id].count = 0;
    }
    // 深層複製物件
    this.dishes = JSON.parse(JSON.stringify(menu));
    console.log(this.dishes);
  },
  methods: {
    add(id) {
      console.log(this.dishes[id].count);
      this.dishes[id].count += 1;
      console.log(this.dishes[id].count);
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
      user.id = "userID";
      user.name = this.displayName;
      user.total = this.total;
      user.mark = this.mark;
      user.order = this.thisOrder;
      this.user = JSON.parse(JSON.stringify(user));

      this.comfirmed = true;
      console.log(this.thisOrder);
    },
    cancelOrder() {
      this.comfirmed = false;
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
      console.log(subtotal);
      let total = subtotal.reduce(function(previousVal, currentVal) {
        return previousVal + currentVal;
      }, 0);
      return total;
    }
  }
};
</script>

<template>
<div class="container">
  <comfirm-order v-show="comfirmed" :user="user" :orderId="orderId" :storeId="storeId" @cancelOrder="cancelOrder"></comfirm-order>
  <h1 class="store_name">便當店名</h1>
  
    <ul>
      <li class="item" v-for="(dish,id) in dishes" v-bind:key="id">
        <div class="menu">
          <div class="menu_name">{{dish.name}}</div>
          <div class="price">${{dish.price}}</div>
        </div>
        <div class="menu">
          <div class="counter">
            <button @click="subtract(id)">-</button>
            <div>{{dish.count}}</div>
            <button @click="add(id)">+</button>
          </div>
          <div class="subtotal">${{subtotal(id)}}</div>
        </div>
      </li>
    </ul>
 <div class="total">總共{{total}}元</div>
<div>
  我是<input type="text" v-model="displayName">
</div>
<div>
  備註：<input type="text" v-model="mark"></div>
  <a class="order_btn" href="#" @click="order">下訂單</a>
  <a class="result_btn" href="#">看團定結果</a>
  <a class="share_btn" href="#">分享這頁</a>
</div>
</template>


<style lang="scss" scoped>
li {
  list-style: none;
}

.container {
  width: 90%;
  margin: 0 auto;
  position: relative;
}

.store_name {
  text-align: center;
}

.item {
  padding: 10px;
  margin: 10px 0;
  border-radius: 15px;
  background-color: rgb(223, 222, 222);
}

.menu,
.counter {
  display: flex;
  justify-content: space-between;
}

.order_btn,
.result_btn,
.share_btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px orange solid;
  border-radius: 20px;
}

.total {
  text-align: right;
}

.order_btn {
  background-color: orange;
}
</style>
