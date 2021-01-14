'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');
var imagemin = require('gulp-imagemin'); 


gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});


gulp.task('serve', function() {
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass:watch', function() {
    gulp.watch('./css/*.scss', gulp.series('sass'));
});


gulp.task('clean',function(){
    return del(['dist']);
});
gulp.task('copyfonts', function() {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));

});

gulp.task('imagemin', function(){
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive:true, interlaced:true}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', 'clean', function() {
    gulp.start('copyfonts','imagemin');
});

gulp.task('default', gulp.series('browser-sync', 'sass:watch'));
