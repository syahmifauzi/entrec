var gulp          = require('gulp'),
    jade          = require('gulp-jade'),
    sass          = require('gulp-sass'),
    shell         = require('gulp-shell'),
    sitemap       = require('gulp-sitemap'),
    uncss         = require('gulp-uncss'),
    minifyCss     = require('gulp-minify-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    browserSync   = require('browser-sync').create();


gulp.task('default', ['browserSync', 'watch']);


gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
  browserSync.reload();
});


// Task for building blog when something changed:
gulp.task('jekyll-build', shell.task(['jekyll build']));


// Task for serving blog with BrowserSync..
gulp.task('browserSync', ['sitemap'], function() {
  browserSync.init({
    server: {
      baseDir: '_site/'
    }
  });
});


// Creating Sitemap -> must build jekyll first
gulp.task('sitemap', ['jekyll-build'], function() {
  gulp.src('_site/**/*.html')
    .pipe(sitemap({siteUrl: 'http://www.syahmifauzi.com'}))
    .pipe(gulp.dest('./'));
});


// Jade.. SASS.. Img.. Fonts.. JS..
// ------------------------------------------------------
gulp.task('jade', function() {
  return gulp.src('_jadefiles/**/*.jade')
    .pipe(jade({ pretty: true }))
      // Run errorHandler if have error
      .on('error', errorHandler)
    .pipe(gulp.dest('_includes'));
});

gulp.task('sass', function() {
  return gulp.src('assets/css/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
      // Run errorHandler if have error
      .on('error', errorHandler)
    .pipe(autoprefixer({
      browser: ['last 2 versions', '> i%', 'not ie <= 8'],
      cascade: true
    }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('img', function() {
  return gulp.src('assets/img/**/*')
    .pipe(gulp.dest('_site/assets/img'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('_site/assets/fonts'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
  return gulp.src(['assets/js/**/*.js', '!assets/js/vendor/*.js'])
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/js'));
});
// ------------------------------------------------------


// For Production
// ------------------------------------------------------
gulp.task('production', function() {
  return gulp.src('assets/css/foundation.css')
    .pipe(uncss({
      html: ['index.html', '_includes/**/*.html', '_layouts/**/*.html', '_posts/**/*.html']
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({ stream: true }));
});
// ------------------------------------------------------


gulp.task('watch', ['sass', 'js'], function() {
  gulp.watch(['*.html', '_includes/**/*.html', '_layouts/*.html', '_posts/*.*', 'blog/*.html'], ['jekyll-rebuild']);
  gulp.watch(['assets/css/**/*.scss'], ['sass']);
  gulp.watch(['_jadefiles/**/*.jade'], ['jade']);
  gulp.watch(['assets/img/**/*'], ['img']);
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/js/**/*.js'], ['js']);
});


// Prevent gulp watch from break..
// ------------------------------------------------------
function errorHandler(error) {
    // Logs out error in the command line
  console.log(error.toString());
    // Ends the current pipe, so Gulp watch doesn't break
  this.emit('end');
}
// ------------------------------------------------------
