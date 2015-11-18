var gulp = require('gulp');
var uglify = require('gulp-uglify');
var  htmlmin = require('gulp-htmlmin');
var ngmin = require('gulp-ngmin');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  referLibJs: ['./src/lib/ionic/js/ionic.js',
      './src/lib/ionic/js/angular/angular.js',
      './src/lib/ionic/js/angular/angular-animate.js',
      './src/lib/ionic/js/angular/angular-sanitize.js',
      './src/lib/ionic/js/angular-ui/angular-ui-router.js',
      './src/lib/ionic/js/ionic-angular.js',
      './src/lib/ng-cordova/dist/ng-cordova.js',
      //'./src/lib/hprose/hprose-html5.js',
      //'./src/lib/hprose/angular.hprose.js',
    ],
  sassFiles: ['./src/scss/ionic.app.scss'],
  jsFiles: [
    './src/script/app.js',
    './src/script/services.js',
    './src/script/controllers.js',
  ],
  rsFiles:['./src/img/**/*.*',
  './src/fonts/**/*.*',
  './src/sound/**/*.*'],
  tplFiles:['./src/templates/*.html']
};

gulp.task('default', ['sass','refer','tpl','appjs','cp']);

gulp.task('sass', function(done) {
  gulp.src(paths.sassFiles)
    .pipe(sass())
    .on('error', sass.logError)
  //  .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
gulp.task('refer',function(done){
  gulp.src(paths.referLibJs)
      .pipe(uglify())
        .pipe(concat('refer.lib.min.js'))
        .pipe(gulp.dest('./www/js/'));
});
gulp.task('tpl',function(done){
  gulp.src(paths.tplFiles)
    //.pipe(replace('./img', './img/stu'))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./www/templates'));
});
gulp.task('appjs',function(done){
  gulp.src(paths.jsFiles)
      .pipe(ngmin({dynamic: false}))
      .pipe(stripDebug())
      .pipe(uglify({outSourceMap: false}))
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('./www/js/'));
});
gulp.task('cp',function(done){
  gulp.src('./src/img/**/*.{png,jpg,gif,ico}')
     .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{removeViewBox: false}],
         use: [pngquant({ quality: '65-80', speed: 4 })]
     }))
    .pipe(gulp.dest('./www/img'));
  gulp.src('./src/fonts/**/*.*').pipe(gulp.dest('./www/fonts'));
  gulp.src('./src/sound/**/*.*').pipe(gulp.dest('./www/sound'));
  gulp.src('./src/index.html').pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch(paths.referLibJs, ['refer']);
  gulp.watch(paths.tplFiles, ['tpl']);
  gulp.watch(paths.jsFiles, ['appjs']);
  gulp.watch(paths.rsFiles, ['cp']);
});






gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
