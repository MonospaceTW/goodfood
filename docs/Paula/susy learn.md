# susy 學習筆記

<font color='blue'><b>susy install</b></font>

## Step1. npm install susy

## step2

**1.在gulpfile.js中引入這段**

    var sass = require('gulp-sass');

**2.Using Gulp的話引入官方susy3以下程式碼至gulpfile.js**
```javascript
//gulpfile.js
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass({
            outputStyle: 'uncompressed',
            //uncompressed為編譯出來不要壓縮
            includePaths: ['node_modules/susy/sass']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'));

});
```

@import 以下這段至susy setting檔(setting檔為_引入檔不編譯出來,副檔名為.scss)
```java
// un-prefixed functions
@import 'node_modules/susy/sass/susy';
```

[參考網站]http://oddbird.net/susy/docs/


