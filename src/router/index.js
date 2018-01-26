import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import todoList from "@/components/todoList";
import Menu from "@/components/Menu";


Vue.use(Router)

export default new Router({
  routes: [
    {
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
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
  ]
})
