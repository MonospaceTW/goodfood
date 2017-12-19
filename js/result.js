// 詳細訂單資料
const orders = [
  {
    userID: 0,
    name: 'Clover',
    order: [
      { dishName: '炒飯', number: 1, subtotal: 60 },
      { dishName: '鍋貼', number: 2, subtotal: 120 }
    ]
  },
  {
    userID: 1,
    name: 'Kent',
    order: [
      { dishName: '炒飯', number: 2, subtotal: 120 },
      { dishName: '水餃', number: 3, subtotal: 120 }
    ]
  }

];

// 產生總訂單
let computedOrders = [];
for (let i = 0; i < orders.length; i++) {
  for (let j = 0; j < orders[i].order.length; j++) {
    let item = {};
    item.dishName = orders[i].order[j].dishName;
    item.number = orders[i].order[j].number;
    computedOrders.push(item);
  }
}
console.log(computedOrders);




new Vue({
  el: '#result',
  data: {
    items: computedOrders,
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




