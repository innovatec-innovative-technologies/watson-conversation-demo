var gulp = require("gulp");
var del = require('del');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var runSequence = require("run-sequence");

// delete every thing in the destination folder
gulp.task('clean', () => {
    del([
        'dist/**/*'
    ]);
});

// compile with typescript
gulp.task('tsc', () => {
    tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

// Copy all static files
gulp.task('copy-static', () => {
    gulp.src([
        'src/client/**',
        '!src/client/**/*.json',
        '!src/client/**/*.ts'
    ], {
        dot: true
    }).pipe(gulp.dest('dist/client'))
});

gulp.task("default", function () {
    runSequence('clean', 'tsc', 'copy-static');
});