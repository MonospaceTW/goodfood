<template>
  <div class="container">
    <div class="header">
      <span class="cancel">取消</span>
    </div>
    <div class="content">
      <h1>新增店家</h1>
      <input type="text" class="store-name" placeholder="店家名稱" v-model="store.name">
      <input type="text" class="store-address" placeholder="店家地址" v-model="store.address">
      <input type="text" class="store-tel" placeholder="店家電話" v-model="phoneNumber">
      <input type="text" class="open-time" placeholder="營業時間" v-model="store.time.start">
      <input type="text" class="close-time" placeholder="打烊時間" v-model="store.time.end">
      <input type="text" class="delivery-condition" placeholder="外送條件" v-model="store.orderIn.count">
      <select v-model="selected">
        <option disabled value="">展開選項</option>
        <option>元</option>
        <option>份</option>
      </select>
      <!-- <div  class="unfold-option-area">
        <span class="unfold-option">展開選項</span>
        <span class="arrow">ˇ</span>
        <ul class="delivery-options">
          <li>元</li>
          <li>份</li>
          <li>^</li>
        </ul>
      </div> -->
      <input type="text" class="remark" placeholder="備註" v-model="store.mark">
      <a href="#" class="confirm" @click="addStore">確認</a>
    </div>
  </div>
</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";

const store = FirebaseManager.database.ref("store");

export default {
  props: ["storeId"],
  data() {
    return {
      selected: "",
      phoneNumber: "店家電話",
      store: {
        name: "店家名稱",
        address: "店家地址",
        orderIn: {
          unit: "元 / 份",
          count: 300
        },
        time: {
          start: "09:00",
          end: "17:00"
        },
        tel: {
          block: "區碼",
          num: "號碼"
        },
        mark: ""
      }
    };
  },
  created() {
    /* check login status */
    checkAuth
      .checkAuth()
      .then(userInfo => {
        this.uid = userInfo.uid;
        this.displayName = userInfo.displayName;
      })
      .catch(() => {
        this.$router.push({
          name: "login"
        });
      });
  },
  methods: {
    addStore() {
      const newPhoneNumber = this.phoneNumber.split("-", 2);
      let addStoreInfo = this.store;
      console.log(newPhoneNumber);
      this.store.tel.block = newPhoneNumber[0];
      this.store.tel.num = newPhoneNumber[1];
      this.store.orderIn.unit = this.selected;
      store.push(addStoreInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}
</style>


