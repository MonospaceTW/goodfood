<script>
// var firebase = require("firebase");

export default {
  props: ["thisOrder", "total"],

  mounted() {},
  methods: {
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<template>
  <div class="comfirm_item">
    <h1 class="comfirm_title">訂購確認</h1>
    <ul>
      <li class="order_detail" v-for="(dish,index) in thisOrder" :key="index">
        <div class="flex">
          <div>{{dish.dishName}}</div>
          <div>{{dish.count}}</div>
        </div>
        <div class="comfirm_subtotal">${{dish.subtotal}}</div>
        
      </li>
    </ul>
    <div class="comfirm_total">總共{{total}}元</div>
    <a href="#" class="comfirm_btn">確認訂單</a>
    <a href="#" class="cancel_btn" @click="cancel">取消</a>
  <!-- {{this.thisOrder}} -->
  </div>
</template>

<style>
li {
  list-style: none;
}
.comfirm_title {
  text-align: center;
}

.comfirm_item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}

.flex {
  display: flex;
  justify-content: space-between;
}
.order_detail {
  padding: 10px;
  margin: 10px 0;
  background-color: rgb(223, 222, 222);
  border-radius: 15px;
}

.comfirm_subtotal {
  text-align: right;
}

.comfirm_total {
  text-align: right;
}

.comfirm_btn,
.cancel_btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px orange solid;
  border-radius: 20px;
}

.comfirm_btn {
  background-color: orange;
}
</style>
