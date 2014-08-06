'use strict';

var gulp = require('gulp');
var Q = require('q');
var exec = (function () {
    var sys = require('sys');
    var puts = function puts(err, stdout, stderr) {
        return (stderr && sys.puts(stderr)) || (stdout && sys.puts(stdout));
    };

    return function exec(cmd) {
        return function () {
            return Q.nfcall(require('child_process').exec, cmd).then(puts);
        };
    };
}());
var connect = require('connect');
var http = require('http');
var runSequence = require('run-sequence');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

gulp.task('clean', function() {
    return new Q(true)
        .then(exec('rm -rf .tmp'));
});

gulp.task('sass', function() {
    return new Q(true)
        .then(exec('mkdir -p .tmp/styles'))
        .then(exec('compass compile --sass-dir client/styles --css-dir .tmp/styles'));
});

gulp.task('browserify', function() {
    return new Q(true)
        .then(exec('mkdir -p .tmp/scripts'))
        .then(exec('browserify modules/pickanote/index.js -o .tmp/scripts/main.js'));
});

gulp.task('server', function() {
    var app = connect()
        .use(connect.static('client'))
        .use(connect.static('.tmp'));

    http.createServer(app).listen(3000);

    return new Q(true);
});

gulp.task('watch', function() {
    gulp.watch('client/styles/**/*' , ['sass']);
    gulp.watch('modules/**/*', ['browserify']);

    return new Q(true);
});

gulp.task('default', function(cb) {
    runSequence('clean', ['sass', 'browserify'], ['watch', 'server'], cb);
});

gulp.task('build-clean', ['clean'], function() {
    return new Q(true)
        .then(exec('rm -rf dist'));
});

gulp.task('build-copy', function() {
    return new Q(true)
        .then(exec('cp -r client dist'))
        .then(exec('cp -r .tmp/ dist'))
        .then(exec('rm dist/styles/*.sass'));
});

gulp.task('build-usemin', function() {
    var css = [minifyCss(), 'concat', rev()];
    var js = [uglify(), rev()];

    return gulp.src('dist/index.html')
        .pipe(usemin({
            css: css,
            js: js
        }))
        .pipe(gulp.dest('dist/.build'));
});

gulp.task('build-tidy', function() {
    return new Q(true)
        .then(exec('rm -rf dist/styles'))
        .then(exec('rm -rf dist/scripts'))
        .then(exec('rm dist/*.html'))
        .then(exec('mv dist/.build/scripts dist/scripts'))
        .then(exec('mv dist/.build/styles dist/styles'))
        .then(exec('mv dist/.build/*.html dist'))
        .then(exec('rm -rf dist/.build'))
        .then(exec('rm -rf dist/bower_components'));
});


gulp.task('build', function (cb) {
    runSequence(
        'build-clean',
        ['sass', 'browserify'],
        'build-copy',
        'build-usemin',
        'build-tidy',
        cb
    );
});
