# 菜雞筆記

> ### [vue-cli 環境建置](https://github.com/MonospaceTW/goodfood/blob/Ryin/docs/R-yin/vue-cli_creat/vue-cli%20creat.md)

## Config File

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
