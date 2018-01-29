<script>
// var firebase = require("firebase");

export default {
  data() {
    return {
      orderId: "orderId",
      storeId: "storeId"
    };
  },
  methods: {
    order() {
      this.$router.push({
        name: "ComfirmOrder",
        params: { storeId: this.storeId, orderId: this.orderId }
      });
    }
  }
};
</script>

<template>
<div class="container">
  <h1 class="store_name">便當店名</h1>
  
    <ul>
      <li class="item">
        <div class="menu">
          <div class="menu_name">咖哩鍋貼</div>
          <div class="price">$50</div>
        </div>
        <div class="menu">
          <div class="counter">
            <button>-</button>
            <div>1</div>
            <button>+</button>
          </div>
          <div class="subtotal">$50</div>
        </div>
      </li>
    </ul>
 

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

.order {
  background-color: orange;
}
</style>
