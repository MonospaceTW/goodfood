new Vue({
  el: '#result',
  data: {
    items: [
      { dishName: '炒飯', number: 1, subtotal: 60 },
      { dishName: '鍋貼', number: 2, subtotal: 120 },
    ],
    orders: [
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
          { dishName: '炒飯', number: 1, subtotal: 60 },
          { dishName: '水餃', number: 3, subtotal: 120 }
        ]
      }

    ]
  },
  computed: {
    total() {
      let total = 0;
      for (let i = 0; i < this.items.length; i++) {
        total += this.items[i].subtotal;
      }
      return total;
    },
    totalOrders() {
      let items = [];
      let item = {};
      for (let i = 0; i < this.orders.length; i++) {
        item.dishName = this.orders[i].order[i].dishName;
        item.number = this.orders[i].order[i].number;
        items.push(item);
      }

      return items;
    }
  }

});

