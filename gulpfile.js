const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const csscomments = require('gulp-strip-css-comments');
const cssmin = require('gulp-cssmin');
const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglifyCss = require('gulp-uglifycss');


gulp.task('cleanCss', function() {
	gulp.src('./dist/scss')
	.pipe(clean());
});

gulp.task('cleanIndex', function() {
	gulp.src('./dist/index.html')
	.pipe(clean());
});

gulp.task('sass', ['cleanCss'], function() {
	return gulp.src('./source/scss/style.scss')
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(cssmin())
	.pipe(csscomments({ all: true }))
	.pipe(uglifyCss({ "maxLineLen": 80, "uglyComments": true }))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist/scss'));
});

gulp.task('compressIndex', ['cleanIndex'], function() {
	return gulp.src('source/index.html')
	.pipe(htmlMin({
		collapseWhitespace: true,
		minifyCSS: true,
		removeTagWhitespace: true
	}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['compressIndex', 'sass'], function() {
	console.log('=D');
});