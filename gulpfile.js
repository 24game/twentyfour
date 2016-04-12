var gulp = require("gulp");
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');


gulp.task("default", ["main-task"]);

gulp.task("main-task", function() {
    runSequence(['serve-files', 'reload-changes', 'transpile-javascript']);
});

gulp.task("serve-files", shell.task([
    'http-server ./public -s'
]));

gulp.task("reload-changes", ['reload-html', 'reload-js', 'reload-misc'], function() {
    livereload.listen({start: true});
    gulp.watch('src/**/*.html', ['reload-html']);
    gulp.watch('public/**/.js', ['reload-js']);
});

gulp.task("transpile-javascript", shell.task([
        'webpack --watch --colors --progress'
    ]));

gulp.task("reload-html", function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(livereload());
});

gulp.task("reload-js", function() {
    gutil.log('JavaScript files changed.');
    livereload.reload();
});

gulp.task("reload-misc", function() {
    gulp.src('src/data/**/*.*')
        .pipe(gulp.dest('public/data'))
        .pipe(livereload());
    livereload.reload();
});
