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

    return gulp.src('./scss/index.scss')
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError)) //此段已編譯完成 CSS
        .pipe($.postcss(plugins))
        .pipe(gulp.dest('./css'));
});

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
    gulp.watch('./scss/index.scss', ['sass']);
    // gulp.watch('./*.jade', ['jade']);
});

gulp.task('default', ['sass', 'browserSync', 'watch']); //監控以上指令