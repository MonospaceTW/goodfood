    <template>
  <div class="container">
    <div class="header">
      <a href="#" class="cancle" @click="cancle">取消</a>
    </div>
    <div class="content">
      <h1>新增菜單</h1>
      <div class="form-group" :class="{error: validation.hasError('menuName')}">
        <input type="text" placeholder="請輸入菜名" class="menu-name" v-model="menuName">
        <div class="message">{{ validation.firstError('menuName') }}</div>
      </div>
      <div class="form-group" :class="{error: validation.hasError('menuPrice')}">
      <input type="text" placeholder="$  請輸入價格" class="menu-price" v-model="menuPrice">
      <div class="message menu-price-message">{{ validation.firstError('menuPrice') }}</div>
      </div>
      <div class="menu-option">
        <span class="add-menu-option">新增副選項</span>
        <span class="show-menu-option" @click="addOption($event)"><img src="../assets/images/add.png" alt=""></span>
      </div>
      <div class="menu-option-example">如: 烏龍麵、米粉、冬粉。若無請跳過</div>
      <div class="menu-option-area">
          <input type="text" class="menu-option-input" v-if="showOption" v-for="(menuOption, index) in menuOptions" :key="menuOption.id" v-model="menuOptions[index].name" placeholder="最多5個字">
      </div>

    </div>
    <div class="footer">
      <a href="#" class="confirm-menu" @click.prevent="confirmMenu">確認菜單</a>
      <a href="#" class="check-added-menu" @click.prevent="lookUpMenus">查看已新增菜單</a>
    </div>
  </div>
</template>
<script>
import FirebaseManager from "@/utils/FirebaseManager";
import checkAuth from "@/checkAuth";

const SimpleVueValidation = require("simple-vue-validator");

const Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "此欄位為必填"
  }
});

const store = FirebaseManager.database.ref("store");

export default {
  props: ["storeId"],
  data() {
    return {
      menuName: "",
      menuPrice: "",
      showOption: false,
      menuOptions: [],
      menus: [],
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
      }
    };
  },
  created() {
    const self = this;
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

    self.menus = JSON.parse(localStorage.getItem("addMenus")) || [];
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    menuName: function(value) {
      return Validator.value(value).required();
    },
    menuPrice: function(value) {
      return Validator.value(value).required();
    }
  },
  methods: {
    /* 
      when click confirm menu link,
      and then emit confirmMenu method to add new menu name and price,
    */
    confirmMenu() {
      this.$validate().then(success => {
        if (success) {
          const menuName = this.menuName;
          const menuPrice = this.menuPrice;
          this.menu.name = menuName;
          this.menu.price = menuPrice;
          this.menu.options[0].chooses = this.menuOptions; // assign menu options to Vue data's menu object's chooses propoty
          this.menus.push(this.menu);

          localStorage.setItem("addMenus", JSON.stringify(this.menus));

          this.$router.push({
            name: "adminstoreinfo",
            params: { storeId: this.storeId }
          });
        }
      });
    },
    addOption($event) {
      // console.log($event);
      this.showOption = true;
      this.menuOptions.push({ name: "" });
    },
    lookUpMenus() {
      this.$router.push({
        name: "storeinfo",
        params: {
          storeId: this.storeId
        }
      });
    },
    cancle() {
      this.$router.push({
        name: "index"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
  margin-bottom: 37px;
}
.cancle {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: left;
  color: #f8a654;
  margin-right: 17px;
  text-decoration: none;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
}
// input::input-placeholder {
//   text-align: center;
// }
input[type="text"] {
  text-align: center;
}

.form-group {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.message {
  width: 100%;
  text-align: center;
  // margin-top: 10px;
  color: #f75454;
}
.menu-price-message {
  // margin-bottom: 59px;
}

.menu-name {
  width: 68%;
  height: 46px;
  border-radius: 6px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  border: 0;
  // padding: 0 90px;
  margin-top: 16px;
}

.menu-price {
  width: 68%;
  height: 46px;
  border-radius: 6px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  border: 0;
  // padding: 0 90px;
  margin-top: 13px;
  // margin-bottom: 59px;
}
.menu-option {
  margin-bottom: 1.8%;
  margin-top: 59px;
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
  height: 17px;
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #f75454;
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
.confirm-menu {
  height: 80px;
  border-radius: 20px;
  background-image: linear-gradient(92deg, #75bafa, #579cfe);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  display: block;
  text-align: center;
  font-family: MicrosoftJhengHei;
  font-size: 16px;
  letter-spacing: 3px;
  text-decoration: none;
  padding-top: 14px;
  color: #ffffff;
}
.check-added-menu {
  height: 40px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 48px;
  z-index: 999;
  display: block;
  width: 100%;
  text-align: center;
  padding-top: 18px;
  font-family: MicrosoftJhengHei;
  font-size: 16px;
  color: #f8a654;
  letter-spacing: 3px;
  text-decoration: none;
}
.footer {
  height: 106px;
  position: relative;
}
</style>

