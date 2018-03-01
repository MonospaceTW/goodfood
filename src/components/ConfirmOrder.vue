<script>
import FirebaseManager from "@/utils/FirebaseManager";

export default {
  props: ["user", "storeId", "orderId", "uid"],
  data() {
    return {
      total: 0,
      comfirmed: false
    };
  },
  mounted() {
    FirebaseManager.database
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
      FirebaseManager.database
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
          FirebaseManager.database
            .ref("order/" + this.orderId + "/result")
            .child("total")
            .set(this.total);
        });

      console.log(this.user);

      let update = {};
      update[this.uid] = this.user;
      FirebaseManager.database
        .ref("order/" + this.orderId + "/result/users")
        .update(update)
        .then(data => {
          console.log(data);
          this.$router.push({
            name: "confirmed"
          });
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
  <h1 class="comfirm_title">{{user.name}}的訂單</h1>
  <ul>
    <li class="order_detail" v-for="(dish,id) in user.order" :key="id">
      <div class="flex">
        <div>{{dish.name}}</div>
        <div>{{dish.count}}份</div>
      </div>
      <div class="comfirm_subtotal">${{dish.total}}</div>

    </li>
  </ul>
  <div class="comfirm_total">
    <span>總共</span>
    ＄{{user.total}}</div>
  <div class="btn_group">
    <a href="#" class="cancel_btn" @click="cancelOrder">修改訂單</a>
    <a href="#" class="comfirm_btn" @click="comfirmOrder">確認訂單</a>
  </div>

</div>
</template>

<style lang="scss" scoped>
@import "../scss/index.scss";

li {
  list-style: none;
}

a {
  color: $orange;
  text-decoration: none;
}

.comfirm_item {
  width: 90%;
  font-size: 14px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
}

.comfirm_title {
  margin-bottom: 24px;
  font-size: 17px;
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

.flex,
.comfirm_subtotal {
  padding: 6px 6px 6px 0;
}

.order_detail {
  padding: 10px;
  margin: 10px 0;
  border-radius: 15px;
  background-color: $gray_one;
}

.comfirm_subtotal {
  text-align: right;
}

.comfirm_total {
  text-align: right;
  span {
    color: $blue;
  }
}

.comfirm_btn,
.cancel_btn {
  display: block;
  margin: 0 6px;
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px $orange solid;
  border-radius: 30px;
}

.btn_group {
  display: flex;
  justify-content: space-around;
  padding: 50px 0;
}
</style>
