// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();
//var gmocha = require('gulp-mocha');
//var gutil = require('gulp-util');
// Variables de chemins
var source = '.'; // dossier de travail
var destination = './dist'; // dossier à livrer


gulp.task('copyviews', function () {
 return gulp.src(source + './views/*.pug')
    .pipe(gulp.dest(destination + '/views/'));
 });


gulp.task('mocha', function() {
    return gulp.src([destination + '/tests/*.js'], { read: false })
        .pipe(plugins.mocha({ reporter: 'list' }))
        .on('error', plugins.util.log);
});


gulp.task('default', ['copyviews']);