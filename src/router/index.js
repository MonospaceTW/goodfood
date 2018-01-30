import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todoList from "@/components/todoList";
import Result from "@/components/Result";


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/todo',
      name: 'todoList',
      component: todoList
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result
    },
  ]
})
