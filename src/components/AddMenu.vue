<template>
  <div class="container">
    <div class="header">
      <div class="cancle">取消</div>
    </div>
    <div class="content">
      <h1>新增菜單</h1>
      <input type="text" class="menu-name" v-model="menuName">
      <input type="text" class="menu-price" v-model="menuPrice">
      <div class="menu-option">
        <span class="add-menu-option">新增副選項</span>
        <span class="show-menu-option"><img src="../assets/images/add.png" alt=""></span>
      </div>
      <div class="menu-remark">如: 烏龍麵、米粉、冬粉。若無請跳過</div>
    </div>
    <div class="footer">
      <a href="#" class="confirm-menu" @click="confirmMenu">確認菜單</a>
      <a href="#" class="check-added-menu">查看已新增菜單</a>
    </div>
  </div>
</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";

const store = FirebaseManager.database.ref("store");

export default {
  props: ["storeId"],
  data() {
    return {
      menuName: "",
      menuPrice: "",
      menus: {
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
      }
    };
  },
  created() {
    /* 檢查登入狀態 */
    checkAuth
      .checkAuth()
      .then(userInfo => {
        this.uid = userInfo.uid;
        this.displayName = userInfo.displayName;
      })
      .catch(() => {
        this.$router.push({
          name: "login"
        });
      });
    /* 新增一個餐點 */
  },
  mounted() {},
  methods: {
    /* 確認菜單並新增 */
    confirmMenu() {
      let menus = this.menus;
      const menuName = this.menuName;
      const menuPrice = this.menuPrice;
      this.menus.name = menuName;
      this.menus.price = menuPrice;
      store
        .child(this.storeId)
        .child("menus")
        .push(menus);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
  margin-bottom: 37px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-name {
  width: 68%;
  margin-top: 16px;
}
.menu-price {
  width: 68%;
  margin-top: 13px;
  margin-bottom: 59px;
}
.menu-option {
  margin-bottom: 1.8%;
}
.show-menu-option {
  width: 20px;
  height: 20px;
}
.show-menu-option img {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.menu-remark {
  margin-bottom: 218px;
}
.footer {
  height: 106px;
}
</style>

