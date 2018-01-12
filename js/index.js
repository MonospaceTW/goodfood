Vue.component('my-component', {
  template: '#my-component',
  data: function () {
    return {
      imglink1: 'img/c.png',
      imglink2: 'img/u.png',
      imglink3: 'img/j.png',
      imglink4: 'img/e.png',
      imglink5: 'img/l.png',
      imglink6: 'img/d.png',

    }
  },
  methods: {
    search() {
      console.log(1);
    }
  }
});

const vm = new Vue({
  el: '#app',
  data: {

  }
})