

// project variables


// required variables

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// theme tasks

gulp.task('theme:css', function() {
	return gulp.src('./style.scss')
		.pipe($.sass()
			.on('error', $.notify.onError({ title: 'SASS Compilation Error', message: '<%= error.message %>' })))
		.pipe($.autoprefixer({ browsers: [ 'last 2 versions', 'ie >= 11' ], grid: true }))
		.pipe(gulp.dest('./'))
		.pipe($.notify({ title: 'CSS Compiled Successfully', message: '<%= file.relative %>', onLast: true }))
});


// watch tasks

gulp.task('watch', function() {
	gulp.watch('./style.scss', ['theme:css']);
});


// default task

gulp.task('default', ['watch']);