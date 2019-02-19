var gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
var webpackConfig = require("./webpack.config.js");

var sass = require("gulp-sass");
var concat = require('gulp-concat');

sass.compiler = require("node-sass");

gulp.task("build::settings", () => {
    return gulp.src("./client/src/pages/ratings-settings/index.tsx")
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./client/dist/'))
});

gulp.task("watch::settings", () => {
    return gulp.src("./client/src/pages/ratings-settings/index.tsx")
    .pipe(webpackStream({
        ...webpackConfig,
        watch: true
    }), webpack)
    .pipe(gulp.dest('./client/dist/'))
});

gulp.task('sass::concat', function () {
    return gulp.src('./client/src/**/*.scss')
      .pipe(concat('style.scss'))
      .pipe(gulp.dest('./client/dist/css/'));
  });

  gulp.task('style::build', function () {
    return gulp.src('./client/dist/css/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./client/dist/css/'));
  });