const gulp = require('gulp');
const nodeSass = require('node-sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(nodeSass);

const browserSync = require("browser-sync");

gulp.task('sass', function() {
  return gulp.src('./assets/css/*.scss')
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("sass:watch", function(){
    gulp.watch("./assets/css/*.scss", gulp.series("sass"))
});

gulp.task("browser-sync", function () {
    const files = [
      "./*.html",
      "./assets/css/*.css",
      "./assets/img/*.{png, jpg, gif}",
      "/assets/js/*.js",
    ];
    browserSync.init(files, {
      server: {
        baseDir: "./",
      },
    });
  });

  gulp.task("default", gulp.parallel("sass:watch","browser-sync"));