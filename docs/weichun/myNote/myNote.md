## vue cli-weichun 的 紀錄

### 2018/1/23 vue-cli TO DO LIST 練習紀錄 

***

#### vue cli 環境架設

0. 需先下載 node.js 9.4.0

1. 從github/monospaceTW/goodfood 的 develop 裡面 clone 到自己的local端(在本地端建立了一個vuecli資料夾)，建立branch:weichun並push上去，完成自己的 遠端及本地端 branch。

2. 打開node.js command prompt 執行npm下載
- cd gfVuecli 進入本地端 branch的資料夾
- npm install 下載npm
- 完成下載後，便可以在 http://localhost:8080 看到 vue cli 預設hello world 畫面
- 出現歡迎畫面便完成初步環境建置。 

#### TO DO LIST 練習

0. 環境建置  
參考網站:[Jeremy Kithome 的文章](https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2) ; 
使用樣式 [semantic](https://semantic-ui.com/) 及 [sweetalert](https://sweetalert.js.org/)


1. 將 [semantic](https://semantic-ui.com/) 及 [sweetalert](https://sweetalert.js.org/) 放入index裡，才會有如[DEMO](https://todo-vue.herokuapp.com/)的樣式。


![image](../imgs/style.png)

2. Vue cli架構:

- Component structure- a main component & sub-components. <br>
VUE CLI 的架構為:主架構+子架構


(此範例中: App.vue為main component;TodoList.vue、Todo.vue為sub-components)

- 建立一個新的vue檔案-TodoList.vue 此新檔案裏面包含三個部分:template(visual part), component class(行為、事件、DATA在此區域) and styles sections.


3. Importing Components 將TodoList.vue import到 App.vue

- 用 TodoList.vue 取代 HelloWorld.vue:


  a. 在components資料夾中開啟App.vue


  b. script處 import 由 HellowWorld 改為 TodoList


  ![image](../imgs/import.png)
  


  c. template 用 ```<todo-list> </todo-list>```的方式映出(render)於檔案 TodoList.vue 寫的HTML


  ![image](../imgs/importTemplate.png)
  


  d. 完成import之後，則main-component-App.vue的頁面就會從原本預設helloWorld畫面轉為顯示sub-component-TodoList.vue的內容
  <br>


4. Adding Component Data- 在App.vue 增加 to do list 的內容資料

- todos will have three properties; The title, project and done

- use v-bind  to pass data from the main component to the TodoList component. <todo-list v-bind:todos="todos"></todo-list>

