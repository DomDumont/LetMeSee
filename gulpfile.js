// Requis
var gulp = require('gulp');

// Include plugins
var fsync = require('gulp-files-sync');

// Variables de chemins
var source = '.'; // dossier de travail
var destination = './dist'; // dossier à livrer


gulp.task('copyviews', function () {
 return gulp.src(source + './views/*.pug')
    .pipe(gulp.dest(destination + '/views/'));
 });


gulp.task('default', ['copyviews']);