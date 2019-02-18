var gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
var webpackConfig = require("./webpack.config.js");

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