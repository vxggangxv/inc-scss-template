'use strict';
/**
 * 모듈 호출
 */
var del = require('del'),
	gulp  = require('gulp'),
	fileinclude  = require('gulp-file-include'),
	sass	  = require('gulp-sass'),
	sourcemaps  = require('gulp-sourcemaps'),
	// autoprefixer  = require('autoprefixer'),
	autoprefixer  = require('gulp-autoprefixer'),
	// cssmin = require('gulp-cssmin'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	// plumber   = require('gulp-plumber'),
	watch     = require('gulp-watch'),
	htmlbeautify  = require('gulp-html-beautify'),
	replace  = require('gulp-replace'),
	browserSync = require('browser-sync').create(), // browser-sync 호출

	config  = require('./config')(); // 환경설정 ./config.js
	
	sass.compiler = require('node-sass');

/*
 * Gulp 업무(Tasks) 정의 v3.9.1
 */

// 기본
gulp.task('default', ['browserSync', 'watch']);
gulp.task('mobile', ['browserSync_m', 'watch_m']);

gulp.task('browserSync', ['template', 'sass', 'js'], function() {
	return browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
});
gulp.task('browserSync_m', ['template_m', 'sass', 'js'], function() {
	return browserSync.init({
		server: {
			baseDir: './dist'
		}
	});
});

// PC 관찰
gulp.task('watch', [], function(){
	// HTML 템플릿 업무 관찰
	watch([config.template.src, config.template.parts], function() {
		gulp.start('template');
	});
	// Sass 업무 관찰
	watch(config.sass.src, function() {
		gulp.start('sass');
	});
	// Js 업무 관찰
	watch(config.js.src, function() {
		gulp.start('js');
	});
});
// Mobile 관찰
gulp.task('watch_m', [], function(){
	// HTML 템플릿 업무 관찰
	watch([config.template.src_m, config.template.parts_m], function() {
		gulp.start('template_m');
	});
	// Sass 업무 관찰
	watch(config.sass.src, function() {
		gulp.start('sass');
	});
	// Js 업무 관찰
	watch(config.js.src, function() {
		gulp.start('js');
	});
});

// 제거
gulp.task('clean:all', function(){
	del(config.dev);
});
gulp.task('clean:css', function(){
	del(config.sass.dest);
});
gulp.task('clean:js', function(){
	del(config.js.dest);
});

gulp.task('replace_server', function() {
	return gulp.src(config.template.dest + '/**/*.html')
		.pipe( replace('/static/valuehotelgangneung/', '/static2/valuehotelgangneung/') )
		.pipe( replace('/img/valuehotelgangneung/', '/img2/valuehotelgangneung/') )
		.pipe( gulp.dest(config.template.dest) );

});

// HTML 템플릿
gulp.task('template', function(){
	return gulp.src(config.template.src)
		.pipe( fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe( htmlbeautify(config.htmlbeautify) )
		.pipe( gulp.dest(config.template.dest) )
		.pipe( browserSync.stream({ match: '**/*.html' }) );
});
gulp.task('template_m', function(){
	return gulp.src(config.template.src_m)
		.pipe( fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe( htmlbeautify(config.htmlbeautify) )
		.pipe( gulp.dest(config.template.dest_m) )
		.pipe( browserSync.stream({ match: '**/*.html' }) );
});
// scss 컴파일러
gulp.task('sass', function() {
	return gulp.src(config.sass.src)
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'compact'}).on('error', sass.logError)) // {outputStyle: nested} expanded, compact, compressed
        .pipe( autoprefixer() )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest(config.sass.dest) )
		.pipe( browserSync.stream({ match: '**/*.css' }) );
});
gulp.task('css', function() {
	return gulp.src(config.css.src)
		.pipe( autoprefixer() )
		.pipe( cleanCSS() )
		.pipe( rename({suffix: '.min'}) )
		.pipe( gulp.dest(config.css.dest) )
		.pipe( browserSync.stream({ match: '**/*.css' }) );
});
gulp.task('js', function(){
	return gulp.src(config.js.src)
		.pipe( gulp.dest(config.js.dest) )
		.pipe( browserSync.stream({ match: '**/*.js' }) );
});
gulp.task('img', function() {
	return gulp.src(config.img.src)
        .pipe( imagemin() )
		.pipe( gulp.dest(config.img.dest) );
});