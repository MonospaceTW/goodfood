
const now = new Date();
//console.log(now);


const order = firebase.database().ref('order');

// 從網址列取得storeId
var helper = {
  getParameterByName: function (name, url) {
    var regex, results;
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};

let storeId = helper.getParameterByName("storeId");
// http://localhost:8080/menu.html?storeId=-L1LeGds02yWfMcvMwIn





let vm = new Vue({
  el: '#menu',
  data: {
    dishes: [],
    orderEndTime: '',
    storeName: "",
    deliveryCondition: "",
    openTime: "",
    closeTime: "",
    address: "",
    phone: ""
  },
  created() {
    this.orderEndTime = moment(now).add(30, 'm').format('YYYY-MM-D HH:mm:ss');
    console.log(this.orderEndTime);
  },
  methods: {
    teamOrder() {
      const teamOrderKey = order.push({
        orderEndTime: this.orderEndTime,
        storeId: storeId,
      }).key;
      location.href = "order.html?orderId=" + teamOrderKey + "&storeId=" + storeId;
    }
  }
});


// 取得店家資訊
firebase.database().ref("store/").child(storeId).once('value').then(function (store) {
  console.log(store.val());
  let storeInfo = store.val();
  vm.storeName = storeInfo.storeName;
  vm.deliveryCondition = storeInfo.deliveryCondition;
  vm.openTime = storeInfo.openTime;
  vm.closeTime = storeInfo.closeTime;
  vm.address = storeInfo.address;
  vm.phone = storeInfo.phone;
  // // store callback end
});


// 取得菜單
let dishes = [];
// const storeId = '-L1LeGds02yWfMcvMwIn';
firebase.database().ref("dish").orderByChild("storeId").equalTo(storeId).once('value').then(function (snapshot) {
  snapshot.forEach(function (data) {
    // console.log(data.val());
    dishes.push(data.val());
  });
  //console.log(dishes);
  vm.dishes = dishes;


  // dish callback end
});