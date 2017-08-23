// Required Plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    scss = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    cache = require('gulp-cache'),
    exec = require('child_process').exec,
    sys = require('sys'),
    browserSync = require('browser-sync').create();

// Config
var paths = {
        scss: 'app/scss/**/*.scss',
        js: 'app/js/**/*.js',
        images: 'app/img/**/*',
        php: 'app/**/*.php'
    },
    dests = {
        css: 'dist/css',
        js: 'dist/js',
        images: 'dist/img'
    },
    options = {
        autoprefix: 'last 10 version',
        imagemin: { optimizationLevel: 3, progressive: true, interlaced: true },
        jshint: '',
        jshint_reporter: 'default',
        scss: { style: 'compressed', compass: true },
        uglify: { mangle: false }
    };

// CSS
gulp.task('css', function () {
    return gulp.src( paths.scss )
        .pipe( scss( options.scss ).on( 'error', gutil.log ) )
        .pipe( autoprefix( options.autoprefix ) )
        .pipe( gulp.dest( dests.css ) )
        .pipe( notify( { message: 'CSS task complete.' } ) )
        .pipe(browserSync.reload({
            stream: true
        }))
});
// browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost/requestom/dist/index.php"
    });
});

//Markup php/html
gulp.task('markup', function(){
    return gulp.src(paths.php)
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// JS
gulp.task('js', function () {
    return gulp.src( paths.js )
        .pipe( changed( dests.js ) )
        .pipe( jshint( options.jshint ) )
        .pipe( jshint.reporter( options.jshint_reporter ) )
        .pipe( gulp.dest( dests.js ) )
        .pipe( uglify( options.uglify ) )
        .pipe( concat( 'all.min.js' ) )
        .pipe( gulp.dest( dests.js ) )
        .pipe( notify( { message: 'Scripts task complete.' } ) )
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Images
gulp.task('images', function() {
    return gulp.src( paths.images )
        .pipe( cache( imagemin( options.imagemin ) ) )
        .pipe( gulp.dest( dests.images ) )
        .pipe( notify( { message: 'Images task complete.' } ) )
        .pipe(browserSync.reload({
            stream: true
        }))
});

// PHP
gulp.task('phpunit', function() {
    exec('phpunit', function(error, stdout) {
        sys.puts(stdout);
    });
});

// Watch
gulp.task('watch', function () {
    gulp.watch( paths.php, ['markup']);
    gulp.watch( paths.scss, ['css'] );
    gulp.watch( paths.js, ['js'] );
    gulp.watch( paths.images, ['images'] );
    gulp.watch( paths.php, ['phpunit'] );
});

// Global
gulp.task('default', function() {
    gulp.start('markup','css', 'js', 'images', 'watch', 'browser-sync');
});
