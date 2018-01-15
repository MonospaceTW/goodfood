firebase.database().ref('store').once('value').then(function (snapshot) {
  stores = [];

  snapshot.forEach(function (data) {
    stores.push(data.val());
  })
  // console.log(stores);
  // 隨機抽出五家不重複的店
  var recommend = [];
  var ranNum = 5;
  for (var i = 0; i < ranNum; i++) {
    var ran = Math.floor(Math.random() * (stores.length - i));
    recommend.push(stores[ran]);
    stores[ran] = stores[stores.length - i - 1];
  };
  vm.update(recommend);
  console.log(recommend);
  console.log(stores);
});

Vue.use(window.VueAwesomeSwiper);

const vm = new Vue({
  el: '#index',
  data: {
    recommend: [],
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
      console.log(this.recommend);
    }
  }
})

