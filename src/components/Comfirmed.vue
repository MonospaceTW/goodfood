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

<template scoped>
  <div>
<div class="store_name">{{order.store.name}}</div>
<ul>
  <li v-for="(dish,id) in orderDetail" :key="id">
    <div>
      <div>{{dish.name}}</div>
      <div>{{dish.count}}</div>
    </div>
    <div>{{dish.total}}</div>
  </li>
</ul>
<div>總共{{userTotal}}元</div>
  </div>
</template>
