// Defining requirements
var gulp = require( 'gulp' );
var plumber = require( 'gulp-plumber' );
var sass = require( 'gulp-sass' );
var watch = require( 'gulp-watch' );
var cssnano = require( 'gulp-cssnano' );
var rename = require( 'gulp-rename' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var imagemin = require( 'gulp-imagemin' );
var ignore = require( 'gulp-ignore' );
var rimraf = require( 'gulp-rimraf' );
var clone = require( 'gulp-clone' );
var merge = require( 'gulp-merge' );
var sourcemaps = require( 'gulp-sourcemaps' );
var del = require( 'del' );
var cleanCSS = require( 'gulp-clean-css' );
var gulpSequence = require( 'gulp-sequence' );
var replace = require( 'gulp-replace' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rev = require( 'gulp-rev' );

// Configuration file to keep your code DRY
var cfg = require( './gulpconfig.json' );
var paths = cfg.paths;

gulp.task( 'watch-scss', [ 'browser-sync' ], function() {
	gulp.watch( paths.sass + '/**/*.scss', [ 'scss-for-dev' ] );
} );

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task( 'sass', function() {
	var stream = gulp.src( paths.sass + '/*.scss' )
		.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		} ) )
		.pipe( sourcemaps.init( {loadMaps: true} ) )
		.pipe( sass( {errLogToConsole: true} ) )
		.pipe( autoprefixer( 'last 10 versions' ) )
		.pipe( sourcemaps.write( undefined, {sourceRoot: null} ) )
		.pipe( gulp.dest( paths.css ) );
	return stream;
} );

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task( 'watch', function() {
	gulp.watch( paths.sass + '/**/*.scss', [ 'styles' ] );
	gulp.watch( [ paths.dev + '/js/**/*.js', 'js/**/*.js', '!js/front.js', '!js/front.min.js', ], [ 'scripts' ] );
} );

// Run:
// gulp cssnano
// Minifies CSS files
gulp.task( 'cssnano', function() {
	return gulp.src( paths.css + '/core.css' )
		.pipe( sourcemaps.init( {loadMaps: true} ) )
		.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		} ) )
		.pipe( rename( {suffix: '.min'} ) )
		.pipe( cssnano( {discardComments: {removeAll: true}} ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( paths.css ) );
} );

gulp.task( 'minifycss', function() {
	return gulp.src( paths.css + '/core.css' )
		.pipe( sourcemaps.init( {loadMaps: true} ) )
		.pipe( cleanCSS( {compatibility: '*'} ) )
		.pipe( plumber( {
			errorHandler: function( err ) {
				console.log( err );
				this.emit( 'end' );
			}
		} ) )
		.pipe( rename( {suffix: '.min'} ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( paths.css ) );
} );

gulp.task( 'cleancss', function() {
	return gulp.src( paths.css + '/*.min.css', {read: false} ) // Much faster
		.pipe( ignore( 'core.css' ) )
		.pipe( rimraf() );
} );

gulp.task( 'styles', function( callback ) {
	gulpSequence( 'sass', 'minifycss' )( callback );
} );

// Run:
// gulp scripts.
// Uglifies and concat all JS files into one
gulp.task( 'scripts', function() {
	var scripts = [
		paths.dev + '/js/main.js'
	];
	gulp.src( scripts )
		.pipe( concat( 'main.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( paths.js ) );

	gulp.src( scripts )
		.pipe( concat( 'main.js' ) )
		.pipe( gulp.dest( paths.js ) );
} );

gulp.task( 'copy-assets', function() {

	// Vue JS files into /src/js
	var stream = gulp.src( paths.node + 'vue/dist/vue.js' )
		.pipe( gulp.dest( paths.js + paths.vendor ) );
	gulp.src( paths.node + 'vue/dist/vue.min.js' )
		.pipe( gulp.dest( paths.js + paths.vendor ) );

	return stream;
} );
