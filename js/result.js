// 從網址取得訂單ID&店家ID
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

let orderId = helper.getParameterByName("orderId");
let storeId = helper.getParameterByName("storeId");
// ?orderId=-L1LhNkVxQHq7y4R2T9e&storeId=-L1LeGds02yWfMcvMwIn

// 取得店家資訊
let dish = {};
let dishes = [];
let orders = [];
let store = {};
let orderEndTime = "";
firebase.database().ref("store/" + storeId).once('value').then(function (snapshot) {
  store = snapshot.val();
  vm.updateStore();
});
// console.log(store);

// 取得團定截止時間
firebase.database().ref("/order/" + orderId).once('value').then(function (snapshot) {
  orderEndTime = snapshot.val().orderEndTime;
  vm.updateOrderEndTime();
});


// 取得菜單資料
firebase.database().ref("dish").once('value').then(function (snapshot) {
  snapshot.forEach(function (data) {
    // console.log(data.key);
    // console.log(data.val());
    dish = data.val();
    dish.dishId = data.key;
    dishes.push(dish);

  });
  // console.log(dishes);




  // 取得詳細訂單資料
  firebase.database().ref("/order/" + orderId + "/orderDetail/").on('value', function (snapshot) {
    // 先把訂單歸零避免重複添加
    orders = [];
    snapshot.forEach(function (data) {
      orders.push(data.val());
      // console.log(data.val());
    });
    // console.log(orders);

    // 產生總訂單
    const computedOrders = [];
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].order.length; j++) {
        let item = {};
        item.dishId = orders[i].order[j].dishId;
        item.dishName = orders[i].order[j].dishName;
        item.count = orders[i].order[j].count;
        computedOrders.push(item);
      }
    }
    console.log(computedOrders);

    const totalOrderCount = [];
    for (i = 0; i < dishes.length; i++) {
      // 把點單按照ID分類，點同一種菜的合併成一個物件
      const totalOrders = computedOrders.filter(function (item) {
        return item.dishId === dishes[i].dishId;
      });
      // console.log(totalOrders);

      // 把物件中的count加起來，推進一個陣列
      const orderCount = {};
      orderCount.dishName = dishes[i].dishName;
      orderCount.dishId = dishes[i].dishId;
      orderCount.count = totalOrders.reduce(function (initial, currentValue) {
        return initial + currentValue.count;
      }, 0);
      orderCount.subtotal = orderCount.count * dishes[i].price;
      totalOrderCount.push(orderCount);
    }
    // console.log(totalOrderCount);

    // 過濾掉點單數量為0個的
    const totalOrderCountFilter = totalOrderCount.filter(function (item) {
      return item.count !== 0;
    });
    console.log(totalOrderCountFilter);

    // 更新至Vue
    vm.orders = orders;
    vm.totalOrders = totalOrderCountFilter;

    // vm.update(orders, totalOrderCountFilter);
    // 計算總價
    vm.computedTotal();


    // order callback結束
  });
  // dish callback 結束
});

// render
let vm = new Vue({
  el: '#result',
  data: {
    orderId: orderId,
    storeId: storeId,
    store: {},
    totalOrders: [],
    orders: [],
    orderEndTime: "",
    total: 0
  },

  methods: {
    updateOrderEndTime() {
      this.orderEndTime = orderEndTime;
    },
    updateStore() {
      this.store = store;
    },
    update: function (orders, totalOrderCountFilter) {
      this.orders = orders;
      this.totalOrders = totalOrderCountFilter;
      // console.log(this.orders);
    },
    computedTotal: function () {
      let total = 0;
      for (let i = 0; i < this.orders.length; i++) {
        total += this.orders[i].userTotal;
      }
      this.total = total;
    },
    closeBox() {
      document.querySelector(".lightbox").style.display = "none";
    },
    share() {
      document.querySelector(".lightbox").style.display = "block";
    }
  }

});

