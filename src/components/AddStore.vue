<template>
  <div class="container">
    <div class="header">
      <a href="#" class="cancel" @click="cancel">取消</a>
    </div>
    <div class="content">
      <h1>新增店家</h1>
      <input type="file" id="file" name="file" value="Upload image">
      <input type="text" class="store-name" placeholder="店家名稱" v-model="store.name">
      <input type="text" class="store-address" placeholder="店家地址" v-model="store.address">
      <input type="text" class="store-tel" placeholder="店家電話" v-model="phoneNumber">
      <div class="store-time">
        <input type="text" class="open-time" placeholder="營業時間" v-model="store.time.start">
        <input type="text" class="close-time" placeholder="打烊時間" v-model="store.time.end">
      </div>
      <div class="delivery-area">
        <input type="number" class="delivery-condition" placeholder="外送條件" v-model="store.orderIn.count">
        <select v-model="selected">
          <option disabled value="">展開選項</option>
          <option>元</option>
          <option>份</option>
        </select>
      </div>
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
  data() {
    return {
      storeId: "",
      selected: "",
      phoneNumber: "",
      store: {
        name: "",
        address: "",
        orderIn: {
          unit: "",
          count: ""
        },
        time: {
          start: "",
          end: ""
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
      // console.log(newPhoneNumber);
      this.store.tel.block = newPhoneNumber[0];
      this.store.tel.num = newPhoneNumber[1];
      this.store.orderIn.unit = this.selected;
      this.storeId = store.push(addStoreInfo).key;

      this.$router.push({
        name: "addmenu",
        params: {
          storeId: this.storeId
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "index"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-top: 29px;
  margin-right: 17px;
}
.cancel {
  // text-align: right;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #f8a654;
  letter-spacing: 1px;
  text-decoration: none;
}

.content {
  flex: 1 0 auto;
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  margin-bottom: 19px;
}

input {
  width: 80.8%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  margin-bottom: 3.2%;
  text-align: center;
}
.store-time {
  display: flex;
  width: 81.334%;
  justify-content: space-between;
}
.open-time,
.close-time {
  width: 47.218%;
}

.delivery-area {
  display: flex;
  width: 81.3%;
  justify-content: space-between;
}

.delivery-condition {
  width: 47.5%;
}

select {
  width: 34%;
  height: 20px;
}

.remark {
  height: 79px;
  margin-bottom: 49px;
}

.confirm {
  width: 32%;
  height: 46px;
  line-height: 46px;
  border-radius: 21.5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border: solid 1px #f7a654;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 3px;
  color: #f7a654;
}
</style>


