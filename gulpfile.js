const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');

const moduleName = 'flashcard';
const destination = './dist/';

gulp.task('build', () => 
    browserify('./src/')
        .transform(babelify)
        .bundle()
        .pipe(source('flashcard.js'))
        .pipe(buffer())
        .pipe(gulp.dest(destination))
);

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['build']);
});
