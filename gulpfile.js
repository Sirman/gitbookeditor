var gulp = require('gulp');
var util = require('gulp-util');
var less = require('gulp-less');
var NodeWebkitBuilder = require('node-webkit-builder');

gulp.task('copy-font-awesome', function() {
    return gulp.src([
            'bower_components/font-awesome/fonts/*',
        ]).pipe(gulp.dest('app/public/fonts/font-awesome'));
});

gulp.task('copy-open-sans', function() {
    return gulp.src([
            'bower_components/open-sans/fonts/**',
        ]).pipe(gulp.dest('app/public/fonts/open-sans'));
});

gulp.task('copy-javascript', function() {
    return gulp.src([
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/jquery/dist/jquery.min.js'
        ]).pipe(gulp.dest('app/public/javascripts'));
});

gulp.task('copy', [
    'copy-font-awesome',
    'copy-open-sans',
    'copy-javascript'
]);

gulp.task('less', function() {
    gulp.src('less/main.less')
        .pipe(less())
        .pipe(gulp.dest('app/public/stylesheets'));
});

gulp.task('build', function() {
    var nwbuilder = new NodeWebkitBuilder({
        files: 'app/**',
        platforms: [ 'osx' ],
        macIcns: 'icons/gitbook-editor.icns'
    });
    nwbuilder.on('log', util.log);
    nwbuilder.build(function(err) {
        if (err) {
            util.log(util.colors.cyan(err));
        } else {
            util.log('All done');
        }
    });
});
