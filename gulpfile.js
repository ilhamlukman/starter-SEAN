var gulp 	= require('gulp');
var path 	= require('path');
var $ 		= require('gulp-load-plugins')();

var _devsrc = {
	folder  : './_development/apps',
	sJs		: './_development/apps/*.js',
	js 		: './_development/apps/**/*.js',
	ejs 	: './_development/apps/**/*.ejs',
	scss 	: './_development/scss/**/*.scss'
};

gulp.task('apps-script', function (){
	gulp.src(_devsrc.sJs,{base : './_development'})
		.pipe($.uglify({mangle : false}))
		.pipe(gulp.dest('./client'))
		.pipe($.livereload());
});

gulp.task('apps-folder', $.folders('./_development/apps', function (folder){
	return gulp.src(path.join('./_development/apps', folder, '*.js'))
		.pipe($.concat(folder + '.js'))
		.pipe($.uglify({mangle : false}))
		.pipe(gulp.dest('./client/apps'))
		.pipe($.livereload());
}));

gulp.task('view', function (){
	gulp.src(_devsrc.ejs, {base : './_development/apps'})
		.pipe(gulp.dest('./client/views'))
		.pipe($.livereload());
	});

gulp.task('style', function (){
	gulp.src('./_development/scss/style.scss')
		.pipe($.plumber())
		.pipe($.sass({
			includePaths : [require('node-bourbon').includePaths, './bower_components/foundation/scss'],
			outputStyle : 'compressed'
		}))
		.pipe(gulp.dest('./client/public/css'))
		.pipe($.livereload());
});

gulp.task('default', function (){
	$.livereload.listen()
	gulp.watch(_devsrc.sJs, ['apps-script']);
	gulp.watch(_devsrc.js, ['apps-folder']);
	gulp.watch(_devsrc.scss, ['style']);
	gulp.watch(_devsrc.ejs, ['view']);
});
