import gulp from "gulp";
import dartSass from "node-sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import browserSync from "browser-sync";

import del from "del";

import usemin from "gulp-usemin";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import cleanCss from "gulp-clean-css";
import rev from "gulp-rev";

import imagemin from "gulp-imagemin";
import flatmap from "gulp-flatmap";
import concat from 'gulp-concat';

gulp.task("sass", function () {
  return gulp
    .src("assets/css/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("assets/css"));
});


gulp.task("sass:watch", function () {
  return gulp.watch("assets/css/*.scss", gulp.series("sass"));
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

gulp.task("default", gulp.parallel("sass:watch", "browser-sync"));

//Concat
gulp.task("styles", function(){
  return gulp.src([
    'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
  ])
  .pipe(concat('fontawesome-bootstrap.css'))
  .pipe(gulp.dest('assets/css/'))
});

//Imagenes
gulp.task("imagemin", function () {
  return gulp
    .src("./assets/img/*.{png,gif,jpg,jpeg}")
    .pipe(
      imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest("dist/assets/img/"));
});

//Fonts
gulp.task("copyfonts", function () {
  return gulp
    .src(
      "node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,svg,eot,otf}"
    )
    .pipe(gulp.dest("dist/assets/webfonts"));
});

//Borrar
gulp.task("clean", function () {
  return del(["dist"]);
});

//Usemin
gulp.task("usemin", function () {
  return gulp
    .src("./*.html")
    .pipe(
      flatmap(function (stream, file) {
        return stream.pipe(
          usemin({
            css: [rev()],
            html: [
              function () {
                return htmlmin({ collapseWhitespace: true });
              },
            ],
            js: [uglify(), rev()],
            inlinejs: [ uglify() ],
            inlinecss: [ cleanCss(), 'concat' ]
          })
        );
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("build", gulp.series("clean", "sass", "styles", "copyfonts", "imagemin", "usemin"));

