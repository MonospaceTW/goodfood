## 安裝firebase

  $ npm install firebase --save

## 在專案中引用

src/main.js

```
var firebase = require("firebase");

 var config = {
  apiKey: "{your-firebase-api-key}",
  authDomain: "專案ID.firebaseapp.com",
  databaseURL: "https://專案ID.firebaseio.com",
  projectId: "專案ID",
  storageBucket: "專案ID.appspot.com",
  messagingSenderId: "公開名稱編號"
};
firebase.initializeApp(config);
```
