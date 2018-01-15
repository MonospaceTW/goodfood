var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var mainBowerFiles = require('main-bower-files');
const browserSync = require('browser-sync');
var plumber = require('gulp-plumber'); //一定要引入套件
var postcss = require('gulp-postcss');

gulp.task('sass', function () {
    var plugins = [
        autoprefixer({
            browsers: ['last 3 version', '>= 5%']
        })
    ];

    return gulp.src('./scss/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError)) //此段已編譯完成 CSS
        .pipe($.postcss(plugins))
        .pipe(gulp.dest('./css'));
});

// gulp.task('babel', () =>
//     gulp.src('./source/js/**/*.js')
//     // .pipe(sourcemaps.init())
//     .pipe($.babel({
//         presets: ['env']
//     }))
//     // .pipe(concat('all.js'))
//     // .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./public/js'))
// );

// gulp.task('bower', function () { // 將 bower 中的組見安裝進來
//     return gulp.src(mainBowerFiles())
//         .pipe(gulp.dest('./.tmp/vendors')) // .tmp 是一個暫存的資料夾
// });

gulp.task('browserSync', function () { // 建立本機伺服器
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: "index.html",
        reloadDebounce: 2000
    })
});

gulp.task('watch', function () { //監控並即時更新
    gulp.watch('./scss/**/*.scss', ['sass']);
    // gulp.watch('./*.jade', ['jade']);
});

gulp.task('default', ['sass', 'browserSync', 'watch']); //監控以上指令