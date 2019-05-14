var gulp = require('gulp'),
	pug = require('gulp-pug')

var config = {
	'pug': {
		'srcPath': 'pug/**/*.pug',
		'outputPath': 'static/html'
	}
};

gulp.task('pug', function(){
	return gulp.src( config.pug.srcPath )
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest( config.pug.outputPath ))
});

gulp.task('watch', function(){
	gulp.watch( config.pug.srcPath )
		.on( 'change', function( path, stats ) {
			console.log( path );
		} )
});

function pugify() {
	return gulp
		.src( config.pug.srcPath )
		.pipe( pug() )
		.pipe( gulp.dest( config.pug.outputPath ) );
}


//gulp.watch( config.pug.srcPath , ['pug']);


gulp.task('default', defaultTask);

function defaultTask(done) {
	// gulp.src( config.pug.srcPath )
	//   .pipe(pug())
	//   .pipe(gulp.dest(config.pug.outputPath))
	gulp.watch( config.pug.srcPath, gulp.task('pug') )
  done();
}

exports.pugify = pugify;