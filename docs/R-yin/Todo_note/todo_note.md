# Vue-cli todoList
>## [教學範例](https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2)


按先前 [Vue-cli 建置教學](../vue-cli creat\vue-cli creat.md)中步驟架設好專案後

先至 ```index.html``` 中撰寫以下 code ，載入這些框架 ( semantic 、 sweetalert ) 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
```

## Step 1. [開始組件化囉！ (Component structure)](https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2#toc-component-structure)

### 1-1. 創建一個我們自己的組件 ( Creating a Component )
我們現在要來建立我們自己需要的組件

在建置專案的時候，預設會產生一支 ```HelloWorld.vue``` (位於 src/components/Hello.vue. )

但我們現在要來寫自己的組件，所以就不需要這支檔案了

我們先創建一支 ```TodoList.vue``` 檔案，code 如下

```JS
<template>
  <div>
    <ul>
        <li> Todo A </li> 
        <li> Todo B </li> 
        <li> Todo C </li> 
    </ul> 
  </div>
</template>

<script type = "text/javascript" >

export default {
};
</script>
<style>
</style>
```

### 1-x. 補充：組件化的定義

教學原文
> A component file consists three parts; template, component class and styles sections. The template area is the visual part of a component. Behaviour, events and data storage for the template are handled by the class. The style section serves to further improve the appearance of the template.


我的理解是
> 一份組件化的檔案( component file )分為三個部分，模板( template，即 HTML 部份)、組件( component class ，即 JavaScript 部份) 及 樣式( styles sections ，即 CSS 部份)。


### 1-2. 引入組件 ( Importing Components )
在剛剛我們創了我們自己的 ```TodoList.vue``` 組件檔

現在我們要將它引入 main component ( ```App.vue``` ) 中
詳細操作可參考 ```App.vue``` 內的註解(下圖)
![img](../imgs/Todo-01.png)

再來為了渲染組件，我們必須修改 ```App.vue``` 當中 ```<template>‵``` 的內容，像是 HTML 元素一樣調用它

**HTML 中的 Component 的字不可使用駝峰式命名，而必須使用 - 或 _ 等方式**
**但若寫在 ```<template></template>``` 中的話則無此限制**

更詳盡的命名規範可參考 [聊聊 Vue 组件命名那些事](https://jingsam.github.io/2016/10/30/vue-components-naming.html)

同時我們也把預設的 style 樣式註解掉

### 1-3. 檢視成果
再經歷以上修改過後的 ```App.vue``` 會長這樣(下圖)
![img](../imgs/Todo-02.png)

　
此時我們再使用 ```npm run dev``` (或輸入 http://localhost:8080 )來看看目前的成果吧！

![img](../imgs/Todo-03.png)
若畫面跟上圖一樣的話，恭喜，截止目前為止的步驟都對囉！


## Step 2. [添加組件內容 ( Adding Component Data )](https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2#toc-adding-component-data)

教學原文
> We will need to supply data to the main component that will be used to display the list of todos. Our todos will have three properties; The title, project and done(to indicate if the todo is complete or not). Components avail data to their respective templates using a data function. This function returns an object with the properties intended for the template. Let's add some data to our component.

我的理解是
> 我們需要提供一些資料(組件)內容到 Todo 的主要組件 ( main component )內。預期的 TodoList 有三個主要屬性，分別是 標題，詳細內容 及 是否完成。
每個組件各有一個函式，用來返還"數據資料值 ( object )"給各自的模版( template )。 

### 2-1. 增加組件( cimponent )內的內容屬性
我們修改 ```App.vue``` 中的內容，增加以下 code
```JS
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
```
完整如下圖

![img](../imgs/Todo-04.png)

### 2-2. 使用 ```v-bind``` 進行綁定

> 關於 ```v-bind``` 更詳細的介紹，參考[官方文件](https://v1-cn.vuejs.org/guide/class-and-style.html)

因為我們需要將資料從 主組件 ( main component )傳到 TodoList 組件( TodoList component )

所以我們使用 ```v-bind``` 這樣一個綁定指令。

在 ```App.vue``` 中修改 code 如下
```JS
<todo-list v-bind:todos="todos"></todo-list>
```

這麼做是為了讓元素的 **todos(參數**) 跟 **data function 中的 todos** 的值做綁定 ( element’s todos attribute to the value of the expression todos. )

↑ 打個問號，需要再做消化理解

現在我們可以將**參數 todos**






