<script>
import FirebaseManager from "@/utils/FirebaseManager";
import olddata from "@/goodfoodOld";

let oldMenu = olddata.dish;

async function uploadStore(store) {
  let storeKey = await FirebaseManager.database.ref("store").push(store).key;
  console.log(store.name, storeKey);
  return storeKey;
}

async function uploadMenu(storeKey, menu, store) {
  let menuKey = await FirebaseManager.database
    .ref("store")
    .child(storeKey)
    .child("menus")
    .push(menu).key;
  console.log(store.name, menu.name, menuKey);

  return menuKey;
}

export default {
  data() {
    return {
      route: "",
      updateData: "",
      msg: ""
    };
  },
  methods: {
    updateStore() {
      let oldStores = olddata.store;

      for (let oldKey in oldStores) {
        let oldStore = oldStores[oldKey];
        let store = {};
        store.name = oldStore.storeName;
        store.address = oldStore.address;

        store.orderIn = {};
        store.orderIn.unit = "";
        store.orderIn.count = "";

        store.time = {};
        store.time.start = oldStore.openTime;
        store.time.end = oldStore.closeTime;

        store.tel = {};
        let tel = oldStore.phone.split("-");
        store.tel.block = tel[0];
        store.tel.num = tel[1];

        store.mark = oldStore.memo || "";

        uploadStore(store).then(storeKey => {
          for (let dishId in oldMenu) {
            if (oldMenu[dishId].storeId === oldKey) {
              let menu = {};
              menu.name = oldMenu[dishId].dishName;
              menu.price = oldMenu[dishId].price;

              menu.options = [
                {
                  max: 0,
                  min: 0,
                  chooses: [
                    {
                      name: ""
                    }
                  ]
                }
              ];
              uploadMenu(storeKey, menu, store);
            }
          }
        });
      }
    },
    update() {
      this.msg = "";

      FirebaseManager.database
        .ref(this.route)
        .set(this.updateData)
        .then(() => {
          this.msg = "修改成功";
        });
    }
  }
};
</script>

<template>
  <div>
    <!-- <button @click="updateStore">updateAllStore</button> -->
    <label for="route">路徑：</label><input id="route" type="text" v-model="route"><br>
    <label for="updateData">修改內容：</label><input id="updateData" type="text" v-model="updateData">
    <button @click="update">修改某一筆</button>
    <div>{{msg}}</div>
    
  </div>
</template>
