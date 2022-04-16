const gulp = require('gulp');
const nodeSass = require('node-sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(nodeSass);

gulp.task('sass', function() {
  return gulp.src('./assets/css/*.scss')
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./assets/css"));
})