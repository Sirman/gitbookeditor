var gulp = require('gulp');
var util = require('gulp-util');
var less = require('gulp-less');
var NodeWebkitBuilder = require('node-webkit-builder');

gulp.task('nwbuild', function() {
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
