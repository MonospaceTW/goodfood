<template>
  <div class="container">
    <div class="header">
      <a href="#" class="cancel" @click="cancel">取消</a>
    </div>
    <div class="content">
      <h1>新增店家</h1>
      <div class="form-group" :class="{error: validation.hasError('store.name')}">
      <input type="text" class="store-name" placeholder="店家名稱" v-model="store.name">
      <div class="message">{{ validation.firstError('store.name') }}</div>
      </div>
      <!-- <button type="button" @click="clickFileInput">上傳圖片</button> -->
      <div>上傳店家圖片：</div>
      <input type="file" id="file" name="file" value="Upload image" @change="uploadImages($event)">
      <input type="text" class="store-address" placeholder="店家地址" v-model="store.address">
      <input type="text" class="store-tel" placeholder="店家電話" v-model="phoneNumber">
      <div class="store-time">
        <input type="text" class="open-time" placeholder="營業時間" v-model="store.time.start">
        <span class="timeDash">-</span>
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
import firebase from "firebase";

const SimpleVueValidation = require("simple-vue-validator");
// const Validator = SimpleVueValidation.Validator;

const Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "此欄位為必填"
  }
});

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
  /* 
    require simple-vue-validator mixin
  */
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "store.name" : function(value) {
      return Validator.value(value).required().regex("^[A-Za-z0-9\u4E00-\u9FFF]+$", "請勿輸入特殊字元").maxLength(10);
    }
  },
  methods: {
    addStore() {
      this.$validate().then(success => {
        if (success) {
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
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "index"
      });
    },
    clickFileInput() {

    },
    uploadImages($event) {
      // console.log($event.target.files[0]);

      // Assign upload's file  to variable file
      let file = $event.target.files[0];

      // Assign Storage ref to storageRef variable
      let storageRef = firebase.storage().ref("images/" + file.name);

      // Assign upload file to task variable 
      let task = storageRef.put(file);

      // check upload status
      task.on("state_changed", function(snapshot) {
        console.log(snapshot.task);
        if (snapshot.task.state_ === "success") {
          alert("店家圖片上傳成功！");
        }
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

.form-group {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.message {
  width: 100%;
  text-align: center;  margin-bottom: 3.2%;
  // margin-top: 10px;
  color: #f75454;
  margin-bottom: 3.2%;
}

.store-name, .store-address, .store-tel {
  width: 81.335%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  margin-bottom: 3.2%;
  text-align: center;
}

.store-name {
  margin-bottom: 0;
}


#file {
  margin-bottom: 12px;
  margin-top: 12px;
}

.store-time {
  display: flex;
  height: 46px;
  width: 81.334%;
  justify-content: space-between;
  margin-bottom: 12px;
}

.timeDash {
  margin-top: 12px;
}

.open-time,
.close-time {
  width: 47.215%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  margin-bottom: 3.2%;
  padding: 0;
  text-align: center;
}

.delivery-area {
  display: flex;
  width: 81.3%;
  justify-content: space-between;
}

.delivery-condition {
  width: 47.236%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  margin-bottom: 3.2%;
  text-align: center;
}

select {
  width: 34%;
  height: 20px;
}

.remark {
  width: 81.334%;
  height: 79px;
  margin-bottom: 49px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  margin-bottom: 3.2%;
  text-align: center;
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


