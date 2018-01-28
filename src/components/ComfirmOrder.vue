<script>
var firebase = require("firebase");

export default {
  props: ["orderId", "storeId"]
};
</script>

<template>
  <div>
    {{this.orderId}}
    {{this.storeId}}
  </div>
</template>
