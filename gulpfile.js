var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');

gulp.task("compile-ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

// Copying Images 
gulp.task('copy-static', function () {
    return gulp.src(['src/client/**', '!src/client/**/*.ts'])
        .pipe(gulp.dest('dist/client'))
});

// Cleaning up
gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('default', function (callback) {
    runSequence(['clean', 'compile-ts', 'copy-static'])
})