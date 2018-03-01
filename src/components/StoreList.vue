<script>
import FirebaseManager from "@/utils/FirebaseManager";
import Order from "./Order";
// import checkAuth from "@/checkAuth";
const firebase = FirebaseManager.getFirebaselib();
export default {
  props: [],
  data() {
    return {
      // uid: "",
      // displayName: "",
      // mark: "",
      // user: {},
      stores: {}
    };
  },
  components: {
    Order
  },
  created() {
    /* 登入驗證 */
    // checkAuth
    //   .checkAuth()
    //   .then(userInfo => {
    //     this.uid = userInfo.uid;
    //     this.displayName = userInfo.displayName;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.$router.push({
    //       name: "login"
    //     });
    //   });
    firebase
      .database()
      .ref("store")
      .once("value")
      .then(snapshot => {
        let list = snapshot.val();
        console.log(list);
        this.stores = JSON.parse(JSON.stringify(list));
      });
  }
};
</script>
<template>
<div class="container">
  <h1 class="list_title">合作店家</h1>
  <div class="content">
    <ul>
      <li v-for="(value, key) in stores" :key="key.id">
        <router-link :to="{path:'/storeinfo/'+key}">
          <img src="https://fakeimg.pl/128x90/?text=Food&font=lobster" alt="">
        </router-link>
        <div class="info_box">
          <div class="store_name">{{value.name}}</div>
          <div class="open_time">營業時間：{{value.time.start}}~{{value.time.end}}</div>
          <div class="store_phone">{{value.tel.block}} {{value.tel.num}}</div>
        </div>
      </li>
    
      <!-- <li class="loading" v-if="loading">Lording...</li> -->
      
    </ul>
  </div>
  <footer></footer>
</div>

</template>

<style lang="scss" scoped>
/*至此結束Reset*/

.container {
  height: 667px;
  margin: 0 auto;
}
.list_title {
  margin-top: 30px;
  font-family: MicrosoftJhengHei;
  font-size: 20px;
  letter-spacing: 2.4px;
  text-align: center;
  color: #f8a654;
  font-weight: 600;
}
ul {
  margin-top: 17px;
  //   border: 1px solid blue;
  li {
    // border: 1px solid green;
    margin-bottom: 22px;
    height: 90px;
    width: 375px;
    a {
      width: 128px;
      margin-left: 28px;
      float: left;
    }
    .info_box {
      float: left;
      margin-left: 18px;
      div {
        margin-left: 18px;
      }
      .store_name {
        font-family: NotoSansCJKtc;
        font-size: 14px;
        letter-spacing: 1px;
        text-align: left;
        color: #000;
        margin-top: 13px;
      }
      .store_type,
      .open_time,
      .store_phone {
        font-family: NotoSansCJKtc;
        font-size: 11px;
        letter-spacing: 1px;
        text-align: left;
        color: #333333;
        margin-top: 6px;
      }
    }
  }
}
footer {
  width: 375px;
  height: 47px;
  background: #000;
  position: absolute;
  top: 629px;
}
</style>
