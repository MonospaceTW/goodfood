let dishes = [];
let orders = [];
let store = {};
firebase.database().ref("store").once('value').then(function (snapshot) {
  snapshot.forEach(function (data) {
    store = data.val();
  });
  vm.updateStore();
});
console.log(store);


// 菜單資料
firebase.database().ref("dish").once('value').then(function (snapshot) {
  snapshot.forEach(function (data) {
    // console.log(data.val());
    dishes.push(data.val());

  });
  // console.log(dishes);



  // 從資料庫取得詳細訂單資料
  firebase.database().ref("order/-L1LhNkVxQHq7y4R2T9e/orderDetail/").on('value', function (snapshot) {
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
    // console.log(computedOrders);

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
      totalOrderCount.push(orderCount);
    }
    // console.log(totalOrderCount);

    // 點單
    const totalOrderCountFilter = totalOrderCount.filter(function (item) {
      return item.count !== 0;
    });
    // console.log(totalOrderCountFilter);

    vm.update(orders, totalOrderCountFilter);
    vm.computedTotal();


    // order callback結束
  });
  // dish callback 結束
});

// render
let vm = new Vue({
  el: '#result',
  data: {
    store: {},
    totalOrders: [],
    orders: [],
    total: 0
  },

  methods: {
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
    }
  }

});

