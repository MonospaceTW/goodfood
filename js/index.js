const vm = new Vue({
  el: '#index',
  data: {

  }
})

var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: true
  },
  loop: true
});