<script>
var firebase = require("firebase");

export default {
  props: ["orderId", "thisOrderKey"],
  created() {
    firebase
      .database()
      .ref("order/" + this.orderId)
      .once("value")
      .then(snapshot => {
        this.order = snapshot.val();
        // console.log(this.order);
        const userOrder = this.order.result.users[this.thisOrderKey];
        this.orderDetail = userOrder.order;
        this.userTotal = userOrder.total;
      });
  },
  data() {
    return {
      order: {
        store: {
          name: ""
        }
      },
      orderDetail: {},
      userTotal: 0
    };
  },
  methods: {}
};
</script>

<template>
  <div class="container">
    <div class="comfirm_img">
      
      <img src="../assets/images/confirm.svg" alt="">
    </div>
    <div class="store_name">{{order.store.name}}</div>
    
    <ul>
      <li class="item" v-for="(dish,id) in orderDetail" :key="id">
        <div  class="flex">
          <div class="menu_name">{{dish.name}}</div>
          <div class="count">{{dish.count}}份</div>
        </div>
        <div class="subtotal">${{dish.total}}</div>
      </li>
    </ul>
    <div class="total">總共{{userTotal}}元</div>
      <a class="result_btn" href="#">看團定結果</a>

  </div>
</template>

<style lang="scss" scoped>
$maincolor: #f7a654;
$fontcolor: #292929;

li {
  list-style: none;
}
.container {
  height: 100vh;
  margin: 0 auto;
  padding: 3%;
  color: white;
  background-color: $maincolor;
}

.comfirm_img {
  text-align: center;
}

.store_name {
  text-align: center;
}

.item {
  padding: 10px;
  margin: 10px 0;
  border-radius: 15px;
  color: $fontcolor;
  background-color: white;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.total,
.subtotal {
  text-align: right;
}

.result_btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px orange solid;
  border-radius: 20px;
  background-color: #e7d115;
  color: $fontcolor;
}
</style>

