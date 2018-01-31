<script>
/* eslint-disable */
// var firebase = require('firebase');
import ComfirmOrder from "./ComfirmOrder";

export default {
  data() {
    return {
      orderId: "orderId",
      storeId: "storeId",
      thisOrder: [],
      comfirmed: false,
      dishes: [
        {
          dishName: "排骨便當",
          storeId: "L05fjkdfjkdjfa",
          price: 30,
          dishId: "-L05fnvmcvmz",
          count: 0
        },
        {
          dishName: "雞腿便當",
          storeId: "L05fjkdfjkdjfa",
          price: 50,
          dishId: "-L05fnvmcvmz",
          count: 0
        }
      ]
    };
  },
  components: {
    ComfirmOrder
  },
  mounted() {
    this.thisOrder = JSON.parse(sessionStorage.getItem("order"));
    console.log(this.thisOrder);
  },
  methods: {
    add(index) {
      this.dishes[index].count += 1;
    },
    subtract(index) {
      if (this.dishes[index].count >= 1) {
        this.dishes[index].count -= 1;
      }
    },
    subtotal(index) {
      let dish = this.dishes[index];
      dish.subtotal = dish.count * dish.price;
      return dish.subtotal;
    },

    order() {
      let dishes = this.dishes;
      this.thisOrder = [];
      for (let i in dishes) {
        if (dishes[i].count >= 1) {
          this.thisOrder.push(dishes[i]);
        }
      }
      this.comfirmed = true;
      console.log(this.thisOrder);
      // sessionStorage.setItem('order', JSON.stringify(this.thisOrder));
      // this.$router.push({
      //   name: 'comfirm_order',
      //   params: { storeId: this.storeId, orderId: this.orderId }
      // });
    },
    edit() {
      this.comfirmed = false;
      console.log("edit");
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
  <comfirm-order v-show="comfirmed" :thisOrder="thisOrder" :total="total" @cancel="edit"></comfirm-order>
  <h1 class="store_name">便當店名</h1>
  
    <ul>
      <li class="item" v-for="(dish,index) in dishes" v-bind:key="index">
        <div class="menu">
          <div class="menu_name">{{dish.dishName}}</div>
          <div class="price">${{dish.price}}</div>
        </div>
        <div class="menu">
          <div class="counter">
            <button @click="subtract(index)">-</button>
            <div>{{dish.count}}</div>
            <button @click="add(index)">+</button>
          </div>
          <div class="subtotal">${{subtotal(index)}}</div>
        </div>
      </li>
    </ul>
 <div class="total">總共{{total}}元</div>

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
