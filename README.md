# 好食在 – 團訂便當系統

## <font size=5>[Demo](https://goodfood-beta.firebaseapp.com/#/)<font>

## 計畫成員
**Front-end**：
[Clover](https://github.com/raindot) 
[Jimmy](https://github.com/yingming25) 
[Paula](https://github.com/jade2018) 
[Ryin](https://github.com/Ryin0424)

**Back-end**：
po-chun ckw bochen 

**UI Design**：
[Hungyu](https://github.com/HungYu-Chen)

**Mentor**：
[Tomas](https://github.com/horsekitlin)

## 緣起與痛點
公司中午訂便當的時候，要統計誰訂了什麼總是很麻煩，還有人會漏傳訂便當的紙而沒訂到，我們訪問了中午負責訂便當的負責人：<br>
Q：請問你覺得在訂便當時最困擾的是什麼呢？<br>
A：應該是有人會忘記寫而沒訂到便當

## 解法
做一個訂便當系統，可以分享訂便當頁面到line或其他通訊軟體，提醒並讓大家在線上填寫訂單，負責人只要看著最後填寫的結果聯絡便當店就好

---

## 使用技術

Front-end Framework: Vue.js

Back-end: Firebase Node.js


## Firebase Config File

```
  $ cp src/config_default.js src/config.js
```

填入 firebase 的設定

```javascript
export default {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
