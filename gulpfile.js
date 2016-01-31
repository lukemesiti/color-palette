'use strict'

var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('default', ['test']);
