<template>
  <div class="container">
      <div class="menus">
        <ul>
          <li v-for="(menu, key) in menus" :key="key.id">
            <div class="menu-align-area1">
              <a href="#" class="remove" @click.prevent="removeMenu($event, key)">
                <span class="remove-inner"></span>
              </a>
              <div class="dishName">{{menu.name}}</div>
            </div>
            <div class="dishPrice">${{menu.price}}</div>
          </li>
          <li v-for="(menu, index) in newMenus" :key="menu.id">
            <div class="menu-align-area1">
              <a href="#" class="remove" @click.prevent="removeLocalMenu">
                <span class="remove-inner"></span>
              </a>
              <div class="dishName-new">{{menu.name}}</div>
            </div>
            <div class="dishPrice-new">${{menu.price}}</div>
          </li>
        </ul>

        <div class="check-bar">
          <a href="#" class="add-menu" @click.prevent="addMenu" >新增菜單</a>
          <div class="select-area">
            <a href="#">
              <img class="cancel" src="../assets/images/cancel.png" alt="">
            </a>
            <a href="#" @click.prevent="cofirmAddMenu">
              <img class="check" src="../assets/images/check.png" alt="">
            </a>
          </div>
        </div>

      </div>
  </div>
</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";

const store = FirebaseManager.database.ref("store");

export default {
  props: ["store-id"],
  data() {
    return {
      menus: {},
      menu: {
        name: "玉米濃湯麵",
        price: 100,
        options: [
          {
            max: 1,
            min: 1,
            chooses: [{ name: "烏龍麵" }, { name: "油麵" }]
          },
          {
            max: 1,
            min: 1,
            chooses: [{ name: "加辣" }, { name: "不加辣" }]
          }
        ]
      },
      removeMenus: [],
      newMenus: {}
    };
  },
  created() {
    const self = this;
    const storeId = self.storeId;
    /* 
      將店家的菜單加入 data 中的 menus 中，
      以便在 template 中使用 v-for 渲染菜單列表。 
    */
    store
      .child(storeId)
      .child("menus")
      .once("value")
      .then(snapshot => {
        // console.log(snapshot.val());
        // snapshot.forEach(data => {
        // this.menus.push(data.val());
        // });
        this.menus = snapshot.val();
      });
    // console.log(self.menus);

    self.removeMenus = JSON.parse(localStorage.getItem("removeMenuKeys"));
    self.newMenus = JSON.parse(localStorage.getItem("addMenus"));
  },
  methods: {
    addMenu() {
      this.$router.push({
        name: "addmenulocalstorage",
        params: {
          storeId: this.storeId
        }
      });
    },
    cofirmAddMenu() {
      const self = this;
      const storeId = self.storeId;

      self.newMenus.forEach(localMenu => {
        this.menu.name = localMenu.name;
        this.menu.price = localMenu.price;
        this.menu.options = localMenu.options;
        store
          .child(storeId)
          .child("menus")
          .push(self.menu);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 405px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5px;
}
.menus {
  width: 77.87%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  border-radius: 14px;
  background: #ffffff;
  padding: 30px 7px 0 17px;
  ul {
    width: 100%;
    height: 300px;
    // align-self: center;
    overflow: auto;
    li {
      height: 49px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
    }
  }
}

.menu-align-area1 {
  width: 100%;
  display: flex;
  align-items: flex-start;
}

.remove {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  border: solid 1px #f75454;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
}

.remove-inner {
  width: 10px;
  height: 2px;
  background-color: #f75454;
}

.dishName {
  height: 20px;
  line-height: 20px;
  display: inline-block;
  margin-left: 13px;
}

.dishPrice {
  height: 20px;
  line-height: 20px;
}

.dishName-new {
  height: 20px;
  line-height: 20px;
  display: inline-block;
  margin-left: 13px;
}

.check-bar {
  display: flex;
  width: 100%;
  height: 55px;
  justify-content: space-between;
  align-items: center;
}

.add-menu {
  color: #f8a654;
  text-decoration: none;
  margin-left: 25px;
}

.check {
  margin-left: 30px;
}

.select-area {
  margin-right: 35px;
}

p {
  margin-top: 0;
}
</style>

