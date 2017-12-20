// 菜單資料
const dishes = [
  { dishID: 1, dishName: '炒飯', price: 60, storeID: 'a' },
  { dishID: 2, dishName: '鍋貼', price: 60, storeID: 'a' },
  { dishID: 3, dishName: '水餃', price: 40, storeID: 'a' },
];

// 詳細訂單資料
const orders = [
  {
    userID: 0,
    name: 'Clover',
    order: [
      { dishID: 1, dishName: '炒飯', number: 1, subtotal: 60 },
      { dishID: 2, dishName: '鍋貼', number: 2, subtotal: 120 }
    ]
  },
  {
    userID: 1,
    name: 'Kent',
    order: [
      { dishID: 1, dishName: '炒飯', number: 2, subtotal: 120 },
      { dishID: 3, dishName: '水餃', number: 3, subtotal: 120 }
    ]
  }

];

// 產生總訂單
const computedOrders = [];
for (let i = 0; i < orders.length; i++) {
  for (let j = 0; j < orders[i].order.length; j++) {
    let item = {};
    item.dishID = orders[i].order[j].dishID;
    item.dishName = orders[i].order[j].dishName;
    item.number = orders[i].order[j].number;
    computedOrders.push(item);
  }
}
// console.log(computedOrders);

const totalOrderCount = [];
for (i = 0; i < dishes.length; i++) {
  // 把點單按照ID分類，點同一種菜的物件合併成一個陣列
  const totalOrders = computedOrders.filter(function (item) {
    return item.dishID === dishes[i].dishID;
  });
  // console.log(totalOrders);

  // 把陣列中的count加起來
  const orderCount = {};
  orderCount.dishName = dishes[i].dishName;
  orderCount.dishID = dishes[i].dishID;
  orderCount.count = totalOrders.reduce(function (initial, currentValue) {
    return initial + currentValue.number;
  }, 0);
  totalOrderCount.push(orderCount);
}
console.log(totalOrderCount);

// render
new Vue({
  el: '#result',
  data: {
    items: totalOrderCount,
    orders: orders
  },
  computed: {
    total() {
      let total = 0;
      for (let i = 0; i < this.items.length; i++) {
        total += this.items[i].subtotal;
      }
      return total;
    },
  }

});




