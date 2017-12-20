// 菜單資料
const dishes = [
  { dishID: 1, dishName: '炒飯', price: 60, storeID: 'a' },
  { dishID: 2, dishName: '鍋貼', price: 60, storeID: 'a' },
  { dishID: 3, dishName: '水餃', price: 40, storeID: 'a' },
];

// 從資料庫取得詳細訂單資料
firebase.database().ref("orders").on('value', function (snapshot) {
  const orders = snapshot.val();

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
    // 把點單按照ID分類，點同一種菜的合併成一個物件
    const totalOrders = computedOrders.filter(function (item) {
      return item.dishID === dishes[i].dishID;
    });
    // console.log(totalOrders);

    // 把物件中的count加起來，推進一個陣列
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
        for (let i = 0; i < dishes.length; i++) {

        }
        return total;
      },
    }

  });



});
