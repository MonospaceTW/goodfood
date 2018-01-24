<template>
  <form @submit.prevent="submit">
    <input type="text" v-model="text">
    <button type="submit">送出</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    submit() {
      this.$emit("addTodo", this.text);
      this.text = "";
    }
  }
};
</script>
