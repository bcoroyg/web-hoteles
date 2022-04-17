const gulp = require("gulp");
const nodeSass = require("node-sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass(nodeSass);

const browserSync = require("browser-sync");

const del = require("del");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const usemin = require("gulp-usemin");
const rev = require("gulp-rev");
const cleanCss = require("gulp-clean-css");
const flatmap = require("gulp-flatmap");
const htmlmin = require("gulp-htmlmin");

gulp.task("sass", function () {
  return gulp
    .src("./assets/css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("sass:watch", function () {
  return gulp.watch("./assets/css/*.scss", gulp.series("sass"));
});

gulp.task("browser-sync", function () {
  const files = [
    "./*.html",
    "./assets/css/*.css",
    "./assets/img/*.{png, jpg, gif}",
    "./assets/js/*.js",
  ];
  browserSync.init(files, {
    server: {
      baseDir: "./",
    },
  });
});

//Borrar
gulp.task("clean", function () {
  return del(["dist"]);
});

//Imagenes
gulp.task("imagemin", function () {
  return gulp
    .src("./images/*.{png,jpg,jpeg,gif}")
    .pipe(
      imagemin({ optimizacionLevel: 3, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest("dist/assets/img"));
});

//Usemin
gulp.task("usemin", function () {
  return gulp
    .src("./*.html")
    .pipe(
      flatmap(function (stream, file) {
        return stream
            .pipe(
                usemin({
                  css: [uglify(),rev()],
                  html: [
                    function () {
                      return htmlmin({ collapseWhitespace: true });
                    },
                  ],
                  js: [uglify(), rev()],
                  inlinejs: [uglify()],
                  inlinecss: [cleanCss(), "concat"],
                })
        );
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("default", gulp.parallel("sass:watch", "browser-sync"));

gulp.task("build", gulp.parallel("clean", "imagemin", "usemin"));