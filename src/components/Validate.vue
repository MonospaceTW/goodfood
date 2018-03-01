<script>
var SimpleVueValidation = require("simple-vue-validator");
var Validator = SimpleVueValidation.Validator.create({
  templates: {
    required: "必填",
    minLength: "密碼長度需大於六字元",
    email: "e-mail格式不符",
    match: "密碼不符"
  }
});

module.exports = {
  data: function() {
    return {
      email: "",
      password: "",
      displayName: "",
      repeat: "",
      submitted: false
    };
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    email: function(value) {
      return Validator.value(value)
        .required()
        .email();
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
  methods: {
    submit: function() {
      this.submitted = true;
      this.$validate().then(function(success) {
        if (success) {
          alert("Validation succeeded!");
        }
      });
    }
  }
};
</script>

<template>
<div class="layout-form">
  <form action="" @submit.prevent="submit">
    <div class="form-group" :class="{error: validation.hasError('email')}">
      <div class="label">E-mail</div>
      <div class="content">
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="message">{{ validation.firstError('email') }}</div>
    </div>
    <div class="form-group">
      <div class="label">暱稱</div>
      <div class="content">
        <input type="text" class="form-control" v-model="displayName" />
      </div>
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
        <button type="submit" class="btn btn-primary">送出</button>
      </div>
    </div>
  </form>
</div>
</template>
