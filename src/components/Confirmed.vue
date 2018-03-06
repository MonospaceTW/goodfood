<script>
export default {
  props: ["orderId", "storeId"],
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: "result",
        params: { orderId: this.orderId, storeId: this.storeId }
      });
    }, 500);
  }
};
</script>

<template>
  <div class="container">
    <div class="comfirm_img">
      <img src="../assets/images/confirmed.svg" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
  padding: 3%;
  background-color: white;
}

.comfirm_img {
  text-align: center;
}
</style>
