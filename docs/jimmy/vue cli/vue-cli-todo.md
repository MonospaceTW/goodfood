# Vue Cli TodoList 教學

[教學網址](https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2)

### 在練習這個教學範例時的發生問題
1. 教學的範例程式碼沒有將 CreateTodo 這個 child components import 到 App.vue中

解決方法:

再 App.vue 中如果想要載入子組件(child component)，就必須使用 import 的方式，將子組件(child component)載入父組件(parent component)， 程式碼如下:


```
<template>
  <div id="app">
    <!-- Render the TodoList component -->
    <!-- TodoList becomes -->
    <todo-list :todos="todos"></todo-list>
    <create-todo v-on:create-todo="addTodo"></create-todo>
  </div>
</template>

<script>
import sweetalert from 'sweetalert';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';


export default {
  name: 'App',
  components: {
    TodoList,
    CreateTodo,
  },
  // data function avails data to the template
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,

      }, {
        title: 'Todo B',
        project: 'Project B',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Project C',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Project D',
        done: false,
      }],
    };
  },
  methods: {
    addTodo(newTodo) {
      console.log(newTodo);
      this.todos.push(newTodo);
      sweetalert('Success!', 'To-Do created!', 'success');
    },
  },
};
</script>

```

需要注意，如果要將子組件載入 App.vue 這個父組件(parent component)中 ，在
 export 裡的 compontents 也要將要載入的子組件(child compontent) 加進來。

 要加進 App.vue 的子組件(componten) 分別為 TodoList.vue 、 CreateTodo.vue，

 TodoList.vue 片段程式碼:

 ```
<template>
  <div>
    <p>Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
    <todo v-for="todo in todos" :key="todo.id" @delete-todo="deleteTodo" @complete-todo="completeTodo" :todo.sync="todo"></todo>

  </div>
</template>

<script>

import Todo from './Todo';

export default {
  props: ['todos'],
  components: {
    Todo,
  },
  methods: {
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].done = true;
    },
  },
};
</script>


 ```

 CreateTodo.vue 子組件程式碼:



 ```
 <template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <i class='plus icon'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input v-model="titleText" type='text'>
          </div>
          <div class='field'>
            <label>Project</label>
            <input v-model="projectText" type='text'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm()">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      projectText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.titleText.length > 0 && this.projectText.length > 0) {
        const title = this.titleText;
        const project = this.projectText;
        this.$emit('create-todo', {
          title,
          project,
          done: false,
        });
        this.titleText = '';
        this.projectText = '';
        this.isCreating = false;
      }
    },
  },
};
</script>

 ```
可以看到 component 裡 可以再把有其他的 compontent 給塞入


[參考資料-Vue 組件细則](https://vue-loader.vuejs.org/zh-cn/start/spec.html)

[參考資料-單文件組件](https://cn.vuejs.org/v2/guide/single-file-components.html#%E4%BB%8B%E7%BB%8D)



---


2. 子組件觸發事件給父組件接收，教學範例事件名稱錯誤

範例中錯誤的語法:


```

  <create-todo v-on:add-todo="addTodo">

```

可以看到 v-on: 後面本該接著子組件觸發事件後傳遞給父組件的事件名稱 create-todo，
所以在 App.vue 中的 template 應該把這個子組件觸發的事件名稱接著寫在 v-on:這裡。

程式碼:

```
<template>
  <div id="app">
    <!-- Render the TodoList component -->
    <!-- TodoList becomes -->
    <todo-list :todos="todos"></todo-list>
    <create-todo v-on:create-todo="addTodo"></create-todo>
  </div>
</template>

```


這樣就能成功的接收子組件傳遞給父組件的參數， 父組件接收到事件觸發的後的參數可以成功透過這個 v-on 自訂義事件觸發新的事件處裡從子組件傳來的參數。

參考資料:

  [组件组合](https://cn.vuejs.org/v2/guide/components.html#%E7%BB%84%E4%BB%B6%E7%BB%84%E5%90%88)

  [使用 v-on 绑定自定義事件](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8-v-on-%E7%BB%91%E5%AE%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)












