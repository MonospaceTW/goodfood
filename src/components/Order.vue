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
<div>
  <a href="#" @click="order">Order</a>
</div>
</template>


