var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    prefix = require('autoprefixer'),
    concat = require('gulp-concat'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

// Styles
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([prefix({
            browsers: ["> 0%"]
        })]))
        .pipe(gulp.dest('./css'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        // .pipe(gulpIf('*.js', uglify()))
        // .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js'));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./img'));
});

// Watch
gulp.task('watch', ['styles', 'scripts', 'images'], function() {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['watch'], function() {
    gulp.start('styles', 'scripts', 'images');
});
