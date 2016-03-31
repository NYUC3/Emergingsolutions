var gulp = require("gulp"),
	sass = require("gulp-sass"),
	gulpif = require("gulp-if"),
	minifyCss = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	stripCssComments = require('gulp-strip-css-comments'),
	sourcemaps = require("gulp-sourcemaps"),
	lazypipe = require("lazypipe"),
	useref = require("gulp-useref"),
	runSequence = require("run-sequence"),
	rimraf = require('gulp-rimraf');

var sassPath = "public/sass/**/*.scss",
	htmlPath = "public/**/*.html",
	imgPath = "public/images/**/*.*";

var cssTasks = lazypipe()
				.pipe(minifyCss)	/* Added a pipeline step for minifying CSS. */
				.pipe(stripCssComments, {preserve: false});	/* Added a pipeline step for removing unnecessary comments. */

var jsTasks = lazypipe()
				.pipe(uglify);

gulp.task("html", function () {
    return gulp.src(htmlPath)
        .pipe(useref())
        .pipe(gulpif("*.css", cssTasks()))
        .pipe(gulpif("*.js", jsTasks()))
        .pipe(gulp.dest("dist"));
});

gulp.task("styles", function() {
    return gulp.src(sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"));
});

gulp.task("clean", function() {
   return gulp.src("dist", {read: false})
        .pipe(rimraf({ force: true }));
});

gulp.task("copy", function() {
	return gulp.src(imgPath)
			.pipe(gulp.dest("dist/images"));
});

gulp.task("build", function(callback) {
	runSequence("clean", "styles", "html", "copy", callback);
});

gulp.task("watch", function() {
	gulp.watch(sassPath, function() {
		gulp.run("build");
	});

	gulp.watch(imgPath, function() {
		gulp.run("copy");
	});

	gulp.watch(htmlPath, function() {
		gulp.run("html");
	});
});

gulp.task("default", ["build", "watch"]);