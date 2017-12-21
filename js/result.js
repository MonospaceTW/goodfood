// 菜單資料
// let dishes = [
//   { dishID: 1, dishName: '炒飯', price: 60, storeID: 'a' },
//   { dishID: 2, dishName: '鍋貼', price: 60, storeID: 'a' },
//   { dishID: 3, dishName: '水餃', price: 40, storeID: 'a' },
// ];

let dishes = [
  { storeID: 2, dishId: 1, dishName: '合菜便當', count: 0, price: 60 },
  { storeID: 2, dishId: 2, dishName: '雙主菜便當', count: 0, price: 65 },
  { storeID: 2, dishId: 3, dishName: '雙主菜便當', count: 0, price: 65 },
  { storeID: 2, dishId: 4, dishName: '紅燒排骨飯', count: 0, price: 65 },
  { storeID: 2, dishId: 5, dishName: '酥炸雞腿飯', count: 0, price: 65 },
  { storeID: 2, dishId: 6, dishName: '蒜泥白肉飯', count: 0, price: 65 },
  { storeID: 2, dishId: 7, dishName: '宮保雞丁飯', count: 0, price: 65 },
  { storeID: 2, dishId: 8, dishName: '迷迭香腿排飯', count: 0, price: 65 },
  { storeID: 2, dishId: 9, dishName: '香煎嫩雞排飯', count: 0, price: 65 },
  { storeID: 2, dishId: 10, dishName: '蜜汁雞腿飯', count: 0, price: 65 },
  { storeID: 2, dishId: 11, dishName: '客家油雞飯', count: 0, price: 65 },
  { storeID: 2, dishId: 12, dishName: '古早味排骨飯', count: 0, price: 65 },
  { storeID: 2, dishId: 13, dishName: '秋刀魚飯', count: 0, price: 65 },
  { storeID: 2, dishId: 14, dishName: '老三烤肉飯', count: 0, price: 65 },
  { storeID: 2, dishId: 15, dishName: '蜜汁腿排飯', count: 0, price: 70 },
  { storeID: 2, dishId: 16, dishName: '老三魯排骨飯', count: 0, price: 70 },
  { storeID: 2, dishId: 17, dishName: '香煎銀班魚飯', count: 0, price: 70 },
  { storeID: 2, dishId: 18, dishName: '老三招牌飯', count: 0, price: 70 },
  { storeID: 2, dishId: 19, dishName: '酥炸雞排飯', count: 0, price: 75 },
  { storeID: 2, dishId: 20, dishName: '炭烤雞排飯', count: 0, price: 75 },
  { storeID: 2, dishId: 21, dishName: '煎虱目魚肚飯', count: 0, price: 75 },
  { storeID: 2, dishId: 22, dishName: '炭烤大雞腿飯', count: 0, price: 75 },
  { storeID: 2, dishId: 23, dishName: '廣東滷雞腿飯', count: 0, price: 75 },
  { storeID: 2, dishId: 24, dishName: '酥炸大雞腿飯', count: 0, price: 75 },
  { storeID: 2, dishId: 25, dishName: '蜜汁大雞腿飯', count: 0, price: 75 },
  { storeID: 2, dishId: 26, dishName: '吉士豬排飯', count: 0, price: 75 },
  { storeID: 2, dishId: 27, dishName: '香煎鱈魚飯', count: 0, price: 80 },
  { storeID: 2, dishId: 28, dishName: '紅燒牛腩飯', count: 0, price: 85 },
];

let orders = [];
// 從資料庫取得詳細訂單資料
firebase.database().ref("order/member").on('value', function (snapshot) {
  orders = snapshot.val();
  console.log(orders);

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


  // callback結束
});
