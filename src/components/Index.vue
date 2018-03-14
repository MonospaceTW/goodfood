<script>
import FirebaseManager from "@/utils/FirebaseManager";
// import checkAuth from "@/checkAuth";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// import lodashfp from "lodash/fp";

export default {
  data() {
    return {
      uid: "",
      displayName: "",
      lottery: "",
      recommend: [],
      // swiper的選項
      swiperOption: {
        slidesPerView: 2.5,
        spaceBetween: 10,
        // centeredSlides: true,
        freeMode: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination"
          // dynamicBullets: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // autoplay: false,
        // loop: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    // 抽出首頁要推薦的n個店家
    // var stores = [1, 2, 3, 4, 5, 6, 7, 8];
    FirebaseManager.database
      .ref("store")
      .once("value")
      .then(snapshot => {
        var stores = [];
        var store = {};
        snapshot.forEach(data => {
          store = data.val();
          store.key = data.key;
          stores.push(store);
        });
        var recommendNum = 5;
        var recommend = randomStore(stores, recommendNum);
        this.recommend = recommend;
        console.log(recommend);

        // 抽出好手氣店家
        var lottery = randomStore(stores, 1);
        console.log(lottery);
        this.lottery = lottery.pop();
      });

    // 隨機抽出n個不重複的項目
    function randomStore(rawData, count) {
      var result = [];
      var data = rawData.slice(0);
      for (var i = 0; i < count; i++) {
        var ran = Math.floor(Math.random() * data.length);
        result.push(data.splice(ran, 1)[0]);
      }
      return result;
    }
    // checkAuth
    //   .checkAuth()
    //   .then(userInfo => {
    //     this.uid = userInfo.uid;
    //     this.displayName = userInfo.displayName;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.$router.push({
    //       name: "login",
    //       query: { orderId: this.orderId, storeId: this.storeId }
    //     });
    //   });
  },
  methods: {
    signOut() {
      FirebaseManager.signOut().then(function() {
        // Sign-out successful.
      });
      // .catch(function(error) {
      //   // An error happened.
      // });
    }
  }
};
</script>

<template>
  <div class="container">
    <button @click="signOut">登出</button>
    <div class="lottery_wrapper">
      <router-link :to="{name:'storeinfo', params:{storeId:this.lottery.key}}">好手氣</router-link>
      <router-link class="storelist" :to="{name:'storelist'}">看所有店家</router-link>
      
    </div>
    <swiper :options="swiperOption" class="mt-4 mb-5 recommend_wrapper">
      <swiperSlide class="recommend" v-for="(store,idx) in recommend" :key="idx">
          <img class="cover_img" src="../assets/images/cover3.jpg" alt="">
          <div>{{store.name}}</div>
      </swiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>


<style lang="scss" scoped>
.container {
  /* width: 80%; */
  margin: 0 auto;
  padding: 0 15px;
}
.lottery_wrapper {
  display: flex;
}

.recommend_wrapper {
  height: 215px;
}

.recommend {
  /* width: 200px !important;
  height: 100px; */
  width: 154px;
  height: 173px;
  // padding: 0 6px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 5px 7px 3px rgba(0, 0, 0, 0.15);
  border-bottom: white solid 3px;
  box-sizing: border-box;
}

.cover_img {
  width: 100%;
  height: 134px;
}
</style>
