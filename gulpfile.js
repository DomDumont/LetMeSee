// Requis
var gulp = require('gulp');
var path = require('path');
var log = require('fancy-log');

// Include plugins
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var gulpTs = require('gulp-typescript');

// Variables de chemins
var source = '.'; // dossier de travail
var destination = './dist'; // dossier à livrer


// run browser-sync on for client changes
gulp.task('browser-sync', gulp.series('nodemon', 'watch', function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: [destination +"/**/*.*", destination + "/public/**/*.*",destination +"/views/**/*.*"],
        port: 7000,
    });
}));



// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src(source + '/src/styles/**/*.less')
        .pipe(plugins.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(destination + '/public/stylesheets'));
});


// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return plugins.nodemon({
        script: destination + '/www.js',
        watch: [destination + '/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});

// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch(source + '/src/**/*.ts', gulp.series('build'));
    gulp.watch(source + '/src/views/*.pug', gulp.series('copyviews'));
    gulp.watch(source + '/src/public/**/*', gulp.series('copypublic'));
    gulp.watch(source + '/src/styles/**/*.less', gulp.series('less'));
});


// TypeScript build for /src folder
var tsProject = gulpTs.createProject(source + '/tsconfig.json');
gulp.task('build', function () {
    return gulp.src(source +'/src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest(destination));
});


gulp.task('copyviews', function () {
 return gulp.src(source + '/src/views/**/*.pug')
    .pipe(gulp.dest(destination + '/views/'));
 });

gulp.task('copypublic', function () {
 return gulp.src(source + '/src/public/**/*')
    .pipe(gulp.dest(destination + '/public/'));
 });

gulp.task('test', function() {
    return gulp.src([destination + '/tests/*.js'], { read: false })
        .pipe(plugins.mocha({ reporter: 'list' }))
        .on('error', log);
});


gulp.task('default', gulp.series('copyviews'));
