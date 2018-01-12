
Vue.config.devtools = true;

let stores;
firebase.database().ref('store').once('value').then(function (snapshot) {
  //console.log(snapshot.key);
  stores = snapshot.val();
  //console.log(stores);
  vm.updateStore();
  snapshot.forEach(function (data) {
    console.log(data.val().menuImage);
  })
});

Vue.component('my-component', {
  template: '#my-component',
  data: function () {
    return {
      dishes: [],
      name: '',
      memberKey: '',
      orderKey: '',
      userOrder: [],
      total: 0,
    }
  },
  created() {
    const self = this;
    //console.log(storeId);
    dish.orderByChild("storeId").equalTo(storeId).once('value').then(function (snapshot) {
      //console.log(snapshot.val());
      snapshot.forEach(function (data) {
        //console.log(data.val());
        self.dishes.push(data.val());
      });
    });
  },
  methods: {
  },
});
let vm = new Vue({
  el: '#storeList',
  data: {
    stores: {}
  },
  methods: {
    updateStore() {
      this.stores = stores;
    }
  }
});
