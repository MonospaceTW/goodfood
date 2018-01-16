firebase.database().ref('store').once('value').then(function (snapshot) {
  // 店家列表
  var stores = [];
  snapshot.forEach(function (data) {
    stores.push(data.val());
  });
  console.log(stores);

  // 抽出首頁要推薦的n個店家
  var recommendNum = 5;
  var recommend = randomStore(stores, recommendNum);
  vm.update(recommend);
  console.log(recommend);

  // 店家的key列表
  var storeKeys = [];
  snapshot.forEach(function (data) {
    storeKeys.push(data.key);
  });
  // 在key中抽出好手氣店家
  var lottery = randomStore(storeKeys, 1);
  console.log(lottery);
  vm.lottery = lottery.pop();
});

// 隨機抽出n個不重複的項目
function randomStore(rawData, count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    var ran = Math.floor(Math.random() * (rawData.length - i));
    result.push(rawData[ran]);
    rawData[ran] = rawData[rawData.length - i - 1];
  };
  return result;
}

Vue.use(window.VueAwesomeSwiper);

const vm = new Vue({
  el: '#index',
  data: {
    recommend: [],
    lottery: "",
    // swiper的選項
    swiperOption: {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: true
      },
      loop: true
    }
  },
  components: {
    LocalSwiper: VueAwesomeSwiper.swiper,
    LocalSlide: VueAwesomeSwiper.swiperSlide,
  },
  computed: {
    // swiperB() {
    //   return this.$refs.storeSwiper.swiper
    // }
  },
  methods: {
    update(recommend) {
      this.recommend = recommend;
      // console.log(this.recommend);
    },
    goodLuck() {
      if (this.lottery) {
        location.href = "menu.html?storeId=" + this.lottery;
      }
    }
  }
})

