<template>
  <div class="container">
    <div class="confirm-new-add-menu" :style="{backgroundImage:`url(${img})`}">
    </div>
  </div>
</template>
<script>
export default {
  props: ["storeId"],
  data() {
    return {
      img: require("@/assets/images/order-icon.svg")
    };
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: "addmenu",
        params: { storeId: this.storeId }
      });
    }, 2500);
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.confirm-new-add-menu {
  height: 205px;
  width: 205px;
}
</style>

