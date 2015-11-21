'use strict';
var gulp = require('gulp');
var gls = require('gulp-live-server');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stylish = require('jshint-stylish');
var exec = require('child_process').exec;
var tasks, server;

// Soy otro comentario
function realPath(path){
  return './static/' + path;
}

tasks = {
  startproject: function(){
    [ 'css/components', 'images', 'fonts',
      'js/actions', 'js/apps', 'js/bundles',
      'js/components', 'js/services', 'js/stores',
      'js/vendor', 'js/utils'
    ].map(realPath).forEach(function(folderName){
      exec('mkdir -p ' + folderName);
    });
  },
  //lint js file
  lint: function(){
    return gulp.src('./js/jthread.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
  },
  //compress js files
  compress: function(){
    return gulp.src('./js/jthread.js')
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('./js'));
  },
  //serving out server for testing purposes
  server: function(){
    server = gls.static(['app', 'js'], 3000);
    server.start();
  },
  //watch for file changes
  watch: function(){
    //server.start.bind(server)
    gulp.watch([ './js/jthread.js' ], [ 'lint', 'compress', server.start.bind(server)]);
  }
};

gulp.task('lint', tasks.lint);
gulp.task('compress', tasks.compress);
gulp.task('server', tasks.server);
gulp.task('watch', tasks.watch);
gulp.task('startproject', tasks.startproject);
gulp.task('default', [ 'server', 'lint', 'compress', 'watch' ]);
