import { spawn } from 'node:child_process';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserSyncLib from 'browser-sync';
import stylus from 'gulp-stylus';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import jeet from 'jeet';
import rupture from 'rupture';
import koutoSwiss from 'kouto-swiss';
import prefixer from 'autoprefixer-stylus';
import minimist from 'minimist';

const env = minimist(process.argv.slice(2));
const browserSync = browserSyncLib.create();

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
function jekyllBuild(done) {
  browserSync.notify(messages.jekyllBuild);
  spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done);
}

/**
 * Rebuild Jekyll & do page reload
 */
const jekyllRebuild = gulp.series(jekyllBuild, function reload(done) {
  browserSync.reload();
  done();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
const browserSyncTask = gulp.series(jekyllBuild, function serve(done) {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
  done();
});

/**
 * Stylus task
 */
function stylusTask() {
  return gulp.src('src/styl/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), jeet(), rupture()],
      compress: true
    }))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('assets/css'));
}

/**
 * Javascript Task
 */
function jsTask() {
  return gulp.src(env.p ? 'src/js/**/*.js' : ['src/js/**/*.js', '!src/js/analytics.js'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'));
}

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watch(done) {
  gulp.watch('src/styl/**/*.styl', stylusTask);
  gulp.watch('src/js/**/*.js', jsTask);
  gulp.watch(['**/*.html', 'index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], jekyllRebuild);
  done();
}

gulp.task('jekyll-build', jekyllBuild);
gulp.task('jekyll-rebuild', jekyllRebuild);
gulp.task('browser-sync', browserSyncTask);
gulp.task('stylus', stylusTask);
gulp.task('js', jsTask);
gulp.task('watch', watch);

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.parallel('js', 'stylus', 'browser-sync', 'watch'));
