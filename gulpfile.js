// Requis
var gulp = require('gulp');
var path = require('path');

// Include plugins
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

//var gmocha = require('gulp-mocha');
//var gutil = require('gulp-util');
// Variables de chemins
var source = '.'; // dossier de travail
var destination = './dist'; // dossier à livrer


// run browser-sync on for client changes
gulp.task('browser-sync', ['nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: [destination +"/**/*.*", destination + "/public/**/*.*",destination +"/views/**/*.*"],
        port: 7000,
    });
});



// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src(source + './styles/**/*.less')
        .pipe(plugins.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(destination + './public/stylesheets'));
});


// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () 
    {
    gulp.watch(source + './src/**/*.ts', ['build']);
    gulp.watch(source + './styles/**/*.less', ['less']);
    }); 


// TypeScript build for /src folder 
var tsConfigSrc = plugins.tsb.create(source + '/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(source +'./src/**/*.ts')
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest(destination));
});


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