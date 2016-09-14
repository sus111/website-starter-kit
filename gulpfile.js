const gulp = require('gulp');
const jade = require('gulp-jade');
const data = require('gulp-data');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

// Node Deps
const fs = require('fs');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade', 'webpack'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/**/*.jade", ['jade']);
    gulp.watch("./src/**/*.scss", ['sass']);
    gulp.watch("./src/**/*.js", ['webpack']);
});

gulp.task('jade', function () {
  return gulp.src("./src/index.jade")
    .pipe(data( file => {
      return JSON.parse(fs.readFileSync('./src/data.json'));
    }))
    .pipe(jade())
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      // .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./dist"))
      .pipe(browserSync.stream());
});

gulp.task('webpack', function () {
  return gulp.src('src/app.js')
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
