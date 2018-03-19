    <template>
  <div class="container">
    <div class="header">
      <div class="cancle">取消</div>
    </div>
    <div class="content">
      <h1>新增菜單</h1>
      <input type="text" placeholder="請輸入菜名" class="menu-name" v-model="menuName">
      <input type="text" placeholder="$  請輸入價格" class="menu-price" v-model="menuPrice">
      <div class="menu-option">
        <span class="add-menu-option">新增副選項</span>
        <span class="show-menu-option" @click="addOption($event)"><img src="../assets/images/add.png" alt=""></span>
      </div>
      <div class="menu-option-example">如: 烏龍麵、米粉、冬粉。若無請跳過</div>
      <div class="menu-option-area">
          <input type="text" class="menu-option-input" v-if="showOption" v-for="(menuOption, index) in menuOptions" :key="menuOption.id" v-model="menuOptions[index].name">
      </div>

    </div>
    <div class="footer">
      <a href="#" class="confirm-menu" @click="confirmMenu">確認菜單</a>
      <a href="#" class="check-added-menu" @click="lookUpMenus">查看已新增菜單</a>
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
      showOption: false,
      menuOptions: [],
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
    /* check login status */
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
  },
  mounted() {},
  methods: {
    /* 
      click confirm menu link,
      and emit confirmMenu method to add new menu name and price,
    */
    confirmMenu() {
      let menus = this.menus;
      const menuName = this.menuName;
      const menuPrice = this.menuPrice;
      this.menus.name = menuName;
      this.menus.price = menuPrice;
      this.menus.options[0].chooses = this.menuOptions; // assign menu options to Vue data's menu object's chooses propoty
      store
        .child(this.storeId)
        .child("menus")
        .push(menus);
      this.$router.push({
        name: "confirmnewaddmenu",
        params: { storeId: this.storeId }
      });
    },
    addOption($event) {
      // console.log($event);
      this.showOption = true;
      this.menuOptions.push({ name: "最多5個字" });
    },
    lookUpMenus() {
      this.$router.push({
        name: "storeinfo",
        params: {
          storeId: this.storeId
        }
      });
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
  height: 46px;
  border-radius: 6px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  border: 0;
  padding: 0 82px;
  margin-top: 16px;
}
.menu-price {
  width: 68%;
  height: 46px;
  border-radius: 6px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  border: 0;
  padding: 0 82px;
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
.menu-option-example {
  margin-bottom: 16px;
}
.menu-option-area {
  width: 78.4%;
  padding: 0 8.8% 0 12.8%;
  display: flex;
  flex-wrap: wrap;
}
// .menu-option-inputs {
//   display: flex;
//   width: 286px;
// }
.menu-option-input {
  width: 30.615%;
  height: 46px;
  border-radius: 6px;
  background-color: #f4f4f4;
  margin: 0;
  margin-right: 8px;
  margin-bottom: 21px;
  padding: 0;
  border: 0;
}
.footer {
  height: 106px;
}
</style>

