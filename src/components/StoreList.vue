<script>
import FirebaseManager from "@/utils/FirebaseManager";
import Order from "./Order";
import checkAuth from "@/checkAuth";
import footerComponent from "./Footer";

const firebase = FirebaseManager.getFirebaselib();

export default {
  props: [],
  data() {
    return {
      uid: "",
      displayName: "",
      mark: "",
      user: {},
      stores: {}
    };
  },
  components: {
    Order,
    footerComponent
  },
  created() {
    /* 登入驗證 */
    checkAuth
      .checkAuth()
      .then(userInfo => {
        this.uid = userInfo.uid;
        this.displayName = userInfo.displayName;
      })
      .catch(error => {
        console.log(error);
        this.$router.push({
          name: "login"
        });
      });
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
  <ul class="content">
      <li v-for="(value, key) in stores" :key="key.id">
        <router-link :to="{path:'/storeinfo/'+key}">
          <img src="https://fakeimg.pl/120x90/?text=Food&font=lobster" alt="">
          <div class="info_box">
            <div class="store_name">{{value.name}}</div>
            <div class="open_time">營業時間：{{value.time.start}}~{{value.time.end}}</div>
            <div class="store_phone">{{value.tel.block}} {{value.tel.num}}</div>
          </div>
        </router-link>
      </li>
      <!-- <li class="loading" v-if="loading">Lording...</li> -->
  </ul>
  <footer-component></footer-component>
</div>

</template>

<style lang="scss" scoped>
.container {
  height: 667px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.list_title {
  margin-top: 30px;
  // font-family: MicrosoftJhengHei;
  font-size: 20px;
  letter-spacing: 2.4px;
  text-align: center;
  color: #f8a654;
  font-weight: bold;
}
ul.content {
  max-width: 375px;
  margin: 0 auto;
  flex: 1 0 auto;
  li {
    // border: 1px solid red;
    margin-top: 22px;
    a {
      display: flex;
      text-decoration: none;
    }
    img {
      margin-left: 28px;
      justify-content: flex-start;
    }
    .info_box {
      margin-left: 18px;
      justify-content: flex-end;
      color: #000;
      .store_name {
        margin-top: 13px;
      }
      .open_time,
      .store_phone {
        margin-top: 6px;
        font-size: 13px;
      }
    }
  }
}
</style>
