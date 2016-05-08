'use strict'

var gulp = require('gulp');
var babel = require('gulp-babel');
var Server = require('karma').Server;
var sass = require('gulp-sass');

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('babel', function () {
  return gulp.src('src/js/colorPalette.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  gulp.src('styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('styles/css/'));
});

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['test']);
	gulp.watch('src/js/*.js', ['babel']);
  gulp.watch('styles/sass/*.scss', ['styles']);
})

gulp.task('default', function () {

});
