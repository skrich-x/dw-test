(function(){
  /*global -$ */
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var php = require('gulp-connect-php');
  var browserSync = require('browser-sync');

  var reload = browserSync.reload;

  gulp.task('styles', function () {
    return gulp.src('styles/main.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 1 version']})
      ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('dist/styles'))
      .pipe(reload({stream: true}));
  });

  gulp.task('scripts', function () {
    return gulp.src('scripts/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.plumber())
      .pipe($.babel())
      .pipe($.concat('main.js'))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/scripts/'))
      .pipe(reload({stream: true}));
  });

  gulp.task('php', function() {
    php.server({ base: 'build', port: 8010, keepalive: true});
});
gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});
gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['build/*.php'], [reload]);
});

  gulp.task('build', ['scripts', 'styles'], function(){});

  gulp.task('serve', ['build'], function () {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['./']
      }
    });

    // watch for changes
    gulp.watch([
      '*.html',
      'scripts/**/*.js'
    ]).on('change', reload);

    gulp.watch('styles/**/*.scss', ['styles']);
    gulp.watch('scripts/**/*.js', ['scripts']);
  });

  gulp.task('default', ['serve'], function (){});
})();
