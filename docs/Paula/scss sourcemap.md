# 引入gulp sourcemap流程
---
## step1 將這段引入至gulpfile.js

![image](/imgs/one.png)
  
## step2 引入這三段
![image](/imgs/two.png)
![image](/imgs/three.png)

將上續三段放至進 *return gulp.src('./scss/**/*.scss')中

如下圖所示

![image](/imgs/for.png)

**若無須放入子資料夾以根目錄表示法**

![image](/imgs/six.png)

## step3

![image](/imgs/nin.png) compile後會產生.map的檔案在相對應的資料夾





 