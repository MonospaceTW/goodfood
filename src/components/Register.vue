<script>
var firebase = require("firebase");
var SimpleVueValidation = require("simple-vue-validator");
var Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "此欄位為必填",
    minLength: "密碼長度需大於六字元",
    email: "e-mail格式不符",
    match: "密碼不一致"
  }
});

export default {
  data() {
    return {
      email: "",
      displayName: "",
      password: "",
      repeat: "",
      submitted: false,
      errorMsg: ""
    };
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    email: function(value) {
      return Validator.value(value)
        .required()
        .email();
    },
    displayName: function(value) {
      return Validator.value(value).required();
    },
    password: function(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    },
    "repeat, password": function(repeat, password) {
      if (this.submitted || this.validation.isTouched("repeat")) {
        return Validator.value(repeat)
          .required()
          .match(password);
      }
    }
  },
  created() {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log("User is signed in.", user);
    //   } else {
    //     console.log("User is not logined yet.");
    //   }
    // });
  },
  methods: {
    register() {
      this.submitted = true;
      this.$validate().then(success => {
        if (success) {
          console.log("Validation succeeded!", this.email, this.password);
          let email = this.email;
          let password = this.password;
          let displayName = this.displayName;
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              console.log("sucess", user);

              user
                .updateProfile({
                  displayName: displayName
                })
                .then(function() {
                  console.log("update displayName sucess", user.displayName);
                })
                .catch(function(error) {
                  console.log(error.message);
                });
              // this.$router.go(-2);
              this.$router.push({ name: "storelist" });
            })
            .catch(error => {
              console.log(error.message, error.code);
              switch (error.code) {
                case "auth/weak-password":
                  this.errorMsg = "密碼需多於六個字元";
                  break;
                case "auth/invalid-email":
                  this.errorMsg = "E-mail格式錯誤";
                  break;
                case "auth/email-already-in-use":
                  console.log("此帳號已被註冊", this.errorMsg);
                  this.errorMsg = "此帳號已被註冊";
                  break;
                case "auth/operation-not-allowed":
                  this.errorMsg = "現在不開放註冊";
                  break;
              }
            });
        }
      });
    },
    cancelRegister() {
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  <div class="container">
    <h1 class="register_title">會員註冊</h1>
    <div class="layout-form">
  <form action="" @submit.prevent="register">
    <div class="form-group" :class="{error: validation.hasError('email')}">
      <div class="label">E-mail</div>
      <div class="content">
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="message">{{ validation.firstError('email') }}{{errorMsg}}</div>
    </div>
    <div class="form-group" >
      <div class="label">暱稱</div>
      <div class="content">
        <input type="text" class="form-control" v-model="displayName" />
      </div>
      <div class="message">{{ validation.firstError('displayName') }}</div>
    </div>
    <div class="form-group" :class="{error: validation.hasError('password')}">
      <div class="label">密碼</div>
      <div class="content">
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="message">{{ validation.firstError('password') }}</div>
    </div>
    <div class="form-group" :class="{error: validation.hasError('repeat')}">
      <div class="label">確認密碼</div>
      <div class="content">
        <input type="password" class="form-control" v-model="repeat" />
      </div>
      <div class="message">{{ validation.firstError('repeat') }}</div>
    </div>
    <div class="form-group">
      <div class="actions">
        <button type="button" class="btn" @click="cancelRegister">取消</button>
        <button type="submit" class="btn btn-primary">送出</button>
      </div>
    </div>
  </form>
</div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.register_title {
  font-size: 20px;
  text-align: center;
}

.layout-form {
  width: 296px;
  margin: 0 auto;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 5px 8px 3px #e2e2e2;
}
.form-group {
  margin-bottom: 15px;

  .label {
    color: #f7a654;
    font-size: 14px;
  }

  .form-control {
    display: inline-block;
    width: 100%;
    // border-bottom: 1px solid gray;
  }
  .message {
    color: #f75454;
    font-size: 12px;
  }

  .actions {
    display: flex;
    justify-content: space-around;
  }
  .btn {
    width: 120px;
    height: 46px;
    background-color: white;
    border: #f7a654 1px solid;
    border-radius: 21px;
  }

  .btn-primary {
    color: white;
    background-color: #f7a654;
  }
}
</style>
