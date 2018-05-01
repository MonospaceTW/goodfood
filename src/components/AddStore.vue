<template>
  <div class="container">
    <div class="header">
      <a href="#" class="cancel" @click="cancel">取消</a>
    </div>
    <div class="content">
      <h1>新增店家</h1>
      <div class="form-group store-name-area" :class="{error: validation.hasError('store.name')}">
        <input type="text" class="store-name" placeholder="店家名稱" v-model="store.name">
        <div class="message">{{ validation.firstError('store.name') }}</div>
      </div>
      <!-- <button type="button" @click="clickFileInput">上傳圖片</button> -->
      <!-- <div>上傳店家圖片：</div>
      <input type="file" id="file" name="file" value="Upload image" @change="uploadImages($event)"> -->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="form-group store-address-area" :class="{error: validation.hasError('store.address')}">
        <input type="text" class="store-address" placeholder="店家地址" v-model="store.address">
        <div class="message">{{ validation.firstError('store.address') }}</div>
      </div>
      <!-- <input type="text" class="store-tel" placeholder="店家電話" v-model="phoneNumber"> -->
      <div class="store-tel">
        <div class="form-group" :class="{error: validation.hasError('store.tel.block')}">
          <input type="text" class="store-tel-block" placeholder="電話區碼" v-model="store.tel.block">
          <div class="message">{{ validation.firstError('store.tel.block') }}</div>
        </div>
        <span class="telDash">-</span>
        <div class="form-group" :class="{error: validation.hasError('store.tel.num')}">
          <input type="text" class="store-tel-num" placeholder="電話號碼" v-model="store.tel.num">
          <div class="message">{{ validation.firstError('store.tel.num') }}</div>
        </div>
      </div>
      <div class="store-time">
        <div class="form-group" :class="{error: validation.hasError('store.time.start')}">
          <input type="text" class="open-time" placeholder="營業時間" v-model="store.time.start">
          <div class="message">{{ validation.firstError('store.time.start') }}</div>
        </div>
        <span class="timeDash">-</span>
        <div class="form-group" :class="{error: validation.hasError('store.time.end')}">
          <input type="text" class="close-time" placeholder="打烊時間" v-model="store.time.end">
          <div class="message">{{ validation.firstError('store.time.end') }}</div>
        </div>
      </div>
      <div class="delivery-area">
        <div class="form-group delivery-condition-area" :class="{error: validation.hasError('store.orderIn.count')}">
          <input type="text" class="delivery-condition" placeholder="外送條件" v-model="store.orderIn.count">
          <div class="message delivery-condition-error">{{ validation.firstError('store.orderIn.count') }}</div>
        </div>
        <select v-model="selected">
          <option disabled value="">展開選項</option>
          <option>元</option>
          <option>份</option>
        </select>
      </div>
      <div class="form-group store-mark-area" :class="{error: validation.hasError('store.mark')}">
        <input type="text" class="remark" placeholder="備註" v-model="store.mark">
        <div class="message">{{ validation.firstError('store.mark') }}</div>
      </div>
      <a href="#" class="confirm" @click.prevent="addStore">確認</a>
    </div>
  </div>
</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";
// import firebase from "firebase";

const SimpleVueValidation = require("simple-vue-validator");
// const Validator = SimpleVueValidation.Validator;

const Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "此欄位必填",
    digit: "請輸入數字",
    maxLength: "字數超過限制"
  }
});

const store = FirebaseManager.database.ref("store");

export default {
  data() {
    return {
      storeId: "",
      selected: "",
      // phoneNumber: "",
      fileList2: [{name: "default.jpeg", url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"}],
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
          block: "",
          num: ""
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

  /* 
    custom validator rules 
  */

  validators: {
    "store.name": function(value) {
      return Validator.value(value).required().regex("^[A-Za-z0-9\u4E00-\u9FFF]+$", "請勿輸入特殊字元").maxLength(10);
    },
    "store.address": function(value) {
      return Validator.value(value).required().regex("^[A-Za-z0-9-\u4E00-\u9FFF]+$", "請輸入正確地址").maxLength(20);
    },
    "store.tel.block": function(value) {
      return Validator.value(value).required().regex("^[0-9]+$", "ex: 04 or 09xx").maxLength(4);
    },
    "store.tel.num": function(value) {
      return Validator.value(value).required().regex("^[0-9]+$", "ex: 22012870 or 456789").maxLength(8);
    },
    "store.time.start": function(value) {
      return Validator.value(value).required().regex("^[0-9]*[0-9]:[0-9][0-9]$", "ex: 9:00");
    },
    "store.time.end": function(value) {
      return Validator.value(value).required().regex("^[0-9]*[0-9]:[0-9][0-9]$", "ex: 20:00");
    },
    "store.orderIn.count": function(value) {
      return Validator.value(value).regex("^[0-9]+$", "ex: 300 or 5").maxLength(4);
    },
    "store.mark": function(value) {
      return Validator.value(value).regex("^[A-Za-z0-9\u4E00-\u9FFF]+$", "請勿輸入特殊字元").maxLength(20);
    }

  },
  methods: {
    addStore() {
      this.$validate().then(success => {
        if (success) {
          let addStoreInfo = this.store;
          // console.log(newPhoneNumber);
          // this.store.tel.block = newPhoneNumber[0];
          // this.store.tel.num = newPhoneNumber[1];
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
    // uploadImages($event) {
    //   // console.log($event.target.files[0]);

    //   // Assign upload's file  to variable file
    //   let file = $event.target.files[0];

    //   // Assign Storage ref to storageRef variable
    //   let storageRef = firebase.storage().ref("images/" + file.name);

    //   // Assign upload file to task variable 
    //   let task = storageRef.put(file);

    //   // check upload status
    //   task.on("state_changed", function(snapshot) {
    //     console.log(snapshot.task);
    //     if (snapshot.task.state_ === "success") {
    //       alert("店家圖片上傳成功！");
    //     }
    //   });
    // }
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeAvatarUpload(file) {

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
  flex-wrap: wrap;
}

.store-name-area, .store-address-area {
  justify-content: center;
  margin-bottom: 12px;
}

.message {
  width: 100%;
  text-align: center;
  // margin-top: 10px;
  color: #f75454;
  font-size: 14px;
}

.store-name, .store-address {
  width: 81.335%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  margin-bottom: 0px;
  text-align: center;
}

#file {
  margin-bottom: 12px;
  margin-top: 12px;
}

.store-tel {
  width: 81.3%;
  box-sizing: border-box;
  display: flex;
  margin: 0 9.3%;
  justify-content: space-between;
}

.store-tel-block, .store-tel-num {
  // width: 97.04%;
  width: 100%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  padding: 0;
  text-align: center;
}

.telDash {
  margin-top: 15px;
}

.store-time {
  display: flex;
  width: 81.334%;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 12px;
}

.timeDash {
  margin-top: 12px;
}

.open-time,
.close-time {
  width: 100%;
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
}

.delivery-condition {
  width: 63.4%;
  height: 46px;
  border-radius: 14px;
  background-color: #f4f4f4;
  border: 0;
  text-align: center;
}

.delivery-condition-error {
  text-align: left;
}

select {
  width: 34%;
  height: 20px;
}

.store-mark-area {
  display: flex;
  justify-content: center;
}

.remark {
  width: 81.334%;
  height: 79px;
  margin-top: 12px;
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


