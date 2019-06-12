var gulp = require( 'gulp' ),
	pug = require( 'gulp-pug' ),
	browserSync = require( 'browser-sync' )
	reload = browserSync.reload

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
			pugify();
		} )
});

function pugify() {
	return gulp
		.src( config.pug.srcPath )
		.pipe( pug({
			pretty: true
		}) )
		.pipe( gulp.dest( config.pug.outputPath ) );
}

exports.pugify = pugify;