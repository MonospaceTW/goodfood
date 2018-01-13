## 好食在 – 團訂便當系統

### 計畫成員
[Clover](https://github.com/raindot)
[Jimmy](https://github.com/yingming25)
[Paula](https://github.com/jade2018)
[HungYu](https://github.com/HungYu-Chen)

### 緣起
公司中午訂便當的時候，要統計誰訂了什麼總是很麻煩，還有人會漏傳訂便當的紙而沒訂到

### 痛點
我們訪問了中午負責訂便當的負責人
Q：請問你覺得在訂便當時最困擾的是什麼呢？
A：應該是有人會忘記寫而沒訂到便當

### 解法
做一個訂便當系統，可以分享訂便當頁面到line或其他通訊軟體，提醒並讓大家在線上填寫訂單

負責人只要看著最後填寫的結果聯絡便當店就好

---
### 系統配置
#### 1. 註冊Firebase並將設定檔更新於 < ./js/config.js >

```javascript
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
firebase 官方配置教學網址:
https://firebase.google.com/docs/web/setup?authuser=0&hl=zh-cn

#### 2. 在Firebase Database設定規則
```
{
  "rules": {
    ".read": true,
    ".write": "auth != null",
      "dish": {
      ".indexOn": ["storeId"]
    }
  }
}
```
#### 3. 在Firebase Authentication 登入方式打開電子郵件/密碼登入選項
 


