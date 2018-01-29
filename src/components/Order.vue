<script>
var firebase = require("firebase");

export default {
  data() {
    return {
      orderId: "orderId",
      storeId: "storeId",
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
  methods: {
    add(index) {
      this.dishes[index].count += 1;
      console.log(this.dishes[index].count);
    },
    subtract(index) {
      if (this.dishes[index].count >= 1) {
        this.dishes[index].count -= 1;
      }
    },
    subtotal(index) {
      return this.dishes[index].count * this.dishes[index].price;
    },

    order() {
      this.$router.push({
        name: "ComfirmOrder",
        params: { storeId: this.storeId, orderId: this.orderId }
      });
    }
  },
  computed: {
    total() {
      let subtotal = [];
      for (let i in this.dishes) {
        subtotal.push(this.dishes[i].count * this.dishes[i].price);
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

  <a class="order" href="#" @click="order">下訂單</a>
  <a class="result" href="#">看團定結果</a>
  <a class="share" href="#">分享這頁</a>
</div>
</template>


<style lang="scss">
li {
  list-style: none;
}

.container {
  width: 90%;
  margin: 0 auto;
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

.order,
.result,
.share {
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

.order {
  background-color: orange;
}
</style>
