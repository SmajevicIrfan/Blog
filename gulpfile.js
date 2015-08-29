// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
 
// Styles
gulp.task('styles', function() {
  return sass('public/css/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 15 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(jshint(/*'.jshintrc'*/))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['public/js/main.min.js'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'watch');
});
 
// Watch
gulp.task('watch', function() {
 
  // Watch .scss files
  gulp.watch('public/css/**/*.scss', ['styles']);
 
  // Watch .js files
  gulp.watch('public/js/**/*.js', ['scripts']);
 
  // Create LiveReload server
  livereload.listen();
 
  // Watch any files in public/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);
});
