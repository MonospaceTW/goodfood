firebase.database().ref('store').once('value').then(function (snapshot) {
  // 店家列表
  var stores = [];
  var store = {};
  snapshot.forEach(function (data) {
    store = data.val();
    store.key = data.key;
    stores.push(store);
  });
  // console.log(stores);

  // 抽出首頁要推薦的n個店家
  var recommendNum = 5;
  var recommend = randomStore(stores, recommendNum);
  vm.update(recommend);
  console.log(recommend);

  // 抽出好手氣店家
  var lottery = randomStore(stores, 1);
  console.log(lottery);
  vm.lottery = lottery.pop();
});

// 隨機抽出n個不重複的項目
function randomStore(rawData, count) {
  var result = [];
  var data = rawData.slice(0);
  console.log(data);
  for (var i = 0; i < count; i++) {
    var ran = Math.floor(Math.random() * data.length);
    result.push(data.splice(ran, 1)[0]);
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
    },
    loginState: '',
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
  created(){
    // firebase.auth().signOut();
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        self.loginState = "登出";
      } else {
        console.log('not login');
        // No user is signed in.
        self.loginState = '登入';
        
      }
    });
  },
  methods: {
    update(recommend) {
      this.recommend = recommend;
      // console.log(this.recommend);
    },
    goRecommend(store) {
      location.href = "menu.html?storeId=" + store.key;
    },
    goodLuck() {
      if (this.lottery) {
        location.href = "menu.html?storeId=" + this.lottery.key;
      }
    },
    toggleSignIn(event){
      console.log(event);
      if (this.loginState == '登出') {
        // User is signed in.
        firebase.auth().signOut();
      }else if(this.loginState == '登入') {
        // No user is signed in.
        location.href = "login.html";
      }

    }

  }
})

