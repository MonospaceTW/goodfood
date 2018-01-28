# Vue-router

## 一、基本設置

src/router/index.js
```
import Vue from 'vue'
import Router from 'vue-router'
import Order from "@/components/Order";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Order',
      component: Order
    }
  ]
})
```

src/App.vue
```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```

http://www.網址/#/Order

### 巢狀路由

網址：
http://www.網址/#/Order/Product

src/router/index.js
```
import Vue from 'vue'
import Router from 'vue-router'
import Order from "@/components/Order";
import Product from "@/components/Product";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Order',
      component: Order,
      children: [
        {
          path: 'Product',
          component: Product
        },
      ]
    }
  ]
})
```


## 二、動態比對參數

### 1.params
在path內使用冒號來動態綁定params (EX:path: '/Order/:id)
若參數為可有可無的話則加上?，可顯示無參數的頁面
(EX:path: '/Order/:id?)

```
{
      path: '/Order/:id?',
      component: Order
    }
```

src/router/index.js
```
import Vue from 'vue'
import Router from 'vue-router'
import Order from "@/components/Order";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Order/:id?',
      component: Order
    }
  ]
})
```

### 在component內調用網址的參數

網址列為：
http://www.網址/#/Order

src/components/Order.vue
```
<template>
  <div>
    {{this.$route.params.id}}
  </div>
</template>
```

## 2.query

網址列為：
http://www.網址/#/Order?id=xxx

path不用加參數
src/router/index.js
```
import Vue from 'vue'
import Router from 'vue-router'
import Order from "@/components/Order";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Order',
      component: Order
    }
  ]
})
```

### 在component內調用的方法為
src/components/Order.vue
```
<template>
  <div>
    {{this.$route.query.id}}
  </div>
</template>
```

## 三、router-link的寫法

### 1.基本寫法
```
<template>
 <router-link :to="/Order">Order</router-link> 
</template>
```
### 2.具名路由

在src/router/index.js
加上name:'Order',
```
routes: [
    {
      path: '/Order',
      name:'Order',
      component: Order
    }
  ]
```
用冒號綁定name的內容
src/App.vue
```
<template>
 <router-link :to="Order">Order</router-link> 
</template>
```

### 3.具名路由＋params

在src/router/index.js
加上params,
```
routes: [
    {
      path: '/Order/:id/:something',
      name:'Order',
      component: Order
    }
  ]
```
在router-link :to中綁定name和params，格式為物件
src/App.vue
```
<template>
  <router-link :to="{
    name:'Order', 
    params: { id: 'ID啥的', something: '其他參數'}}">
    Order
  </router-link> 
</template>
```
網址為：
http://www.網址/#/Order/ID啥的/其他參數

### 4.Programmatic Navigation
如果不把link寫在template，寫在methods裡面的話可以用push：
this.$router.push({})

src/App.vue
```
<script>
export default {
  data() {
    return {
      orderId: "orderId",
      storeId: "storeId"
    };
  },
  methods: {
    order() {
      this.$router.push({
        name: "ComfirmOrder",
        params: { storeId: this.storeId, orderId: this.orderId }
      });
    }
  }
};
</script>

<template>
  <a href="#" @click="order">Order</a>
</template>

```

## 四、把params設為組件的props
原本在組件內調用params要用this.$route.params，會造成此組件只能在router之下使用，設成props之後能讓此組件不管是否用router都可使用

在src/router/index.js
加上props: true
```
routes: [
    {
      path: '/Order/:id/:something',
      name:'Order',
      component: Order,
      props: true
    }
  ]
```

即可在組件內以props調用params

```
<script>
export default {
  props: ["id", "something"]
};
</script>
```

網址為：
http://www.網址/#/Order/ID啥的/something

## 五、history mode & hash mode

```
new Router({
  mode:'history'
})
```

預設hash mode，用＃的方式，不管後面網址怎麼變，實際上都是從index進入
http://www.網址/#/todo

history mode
不會都從index讀取而是使用真實路徑
需要在server設定URL rewrite，否則無法直接讀取網址
http://www.網址/todo


## 六、其他眉角

### 在Vue cli 結構的 main.js裡使用

```
import router from './router'
```
會自動找router資料夾下的index.js