<script>
var firebase = require("firebase");

export default {
  props: ["user", "storeId", "orderId"],
  data() {
    return {
      total: 0,
      thisOrderKey: ""
    };
  },
  mounted() {
    firebase
      .database()
      .ref("order/" + this.orderId + "/result")
      .child("total")
      .once("value")
      .then(snapshot => {
        this.total = snapshot.val();
        console.log(this.total);
      });
  },
  methods: {
    comfirmOrder() {
      // 先獲取資料庫的總訂單金額，加上此次訂單金額，再更新上去
      firebase
        .database()
        .ref("order/" + this.orderId + "/result")
        .child("total")
        .once("value")
        .then(snapshot => {
          this.total = snapshot.val();
          console.log(this.total);
          this.total += this.user.total;
          console.log(this.total);
        })
        .then(() => {
          firebase
            .database()
            .ref("order/" + this.orderId + "/result")
            .child("total")
            .set(this.total);
        });

      console.log(this.user);
      this.thisOrderKey = firebase
        .database()
        .ref("order/" + this.orderId + "/result/users")
        .push(this.user).key;
      console.log(this.thisOrderKey);
      this.$router.replace({
        name: "comfirmed",
        params: { orderId: this.orderId, thisOrderKey: this.thisOrderKey }
      });
    },
    cancelOrder() {
      this.$emit("cancelOrder");
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  <div class="comfirm_item">
    <h1 class="comfirm_title">訂購確認</h1>
    <ul>
      <li class="order_detail" v-for="(dish,id) in user.order" :key="id">
        <div class="flex">
          <div>{{dish.name}}</div>
          <div>{{dish.count}}</div>
        </div>
        <div class="comfirm_subtotal">${{dish.total}}</div>
        
      </li>
    </ul>
    <div class="comfirm_total">總共{{user.total}}元</div>
    <a href="#" class="comfirm_btn" @click="comfirmOrder">確認訂單</a>
    <a href="#" class="cancel_btn" @click="cancelOrder">取消</a>
  </div>
</template>

<style scoped>
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
