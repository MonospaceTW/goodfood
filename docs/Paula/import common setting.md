# common codeing style
https://github.com/MonospaceTW/goodfood/tree/Paula/src/scss

點擊上方連結

### Step1.將index.scss檔import進去
```java
@import "../scss/index.scss";
```
要將目前顏色改為import中的變數名稱,往後有新增的顏色會再更新進去.
### Step2.以下這兩的檔案放進專案資料夾中
* reset.css
* setting.css

於main.js檔引入
```java
require("./scss/setting.css");
require("./scss/reset.css");
```
Step3. npm run dev檢查是否正常顯示'  v  '
