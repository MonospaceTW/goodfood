<template>
  <div class="todoList">
    <todoInput @addTodo="addTodo"></todoInput>
<ul>
  <todoItem v-for="(todo,idx) in todos" :data="todo" :key="idx" @click.native="removeItem(idx)"></todoItem>
</ul>
  </div>
</template>

<script>
import todoInput from "./todoInput";
import todoItem from "./todoItem";

export default {
  name: "todoList",
  components: {
    todoInput,
    todoItem
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    addTodo(text) {
      this.todos.push(text);
    },
    removeItem(idx) {
      this.todos.splice(idx, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
