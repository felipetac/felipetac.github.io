import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
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
import sharp from 'sharp';

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
 * Convert post cover images (PNG/JPG) to WebP, committed alongside
 * under assets/img/. The PNG/JPG source is deleted right after a
 * successful conversion, so only the .webp ends up committed to git —
 * drop a new PNG/JPG in place, point the post's front-matter `image:`
 * at the future .webp filename, then run this task before committing.
 */
const WEBP_SOURCE_DIRS = ['assets/img/posts'];
const WEBP_SOURCE_FILES = ['assets/img/blog-author.png'];

function collectWebpSources() {
  const files = [...WEBP_SOURCE_FILES].filter((f) => fs.existsSync(f));
  for (const dir of WEBP_SOURCE_DIRS) {
    for (const entry of fs.readdirSync(dir)) {
      if (/\.(png|jpe?g)$/i.test(entry)) {
        files.push(path.join(dir, entry));
      }
    }
  }
  return files;
}

async function webpTask() {
  const sources = collectWebpSources();
  await Promise.all(sources.map(async (src) => {
    const dest = src.replace(/\.(png|jpe?g)$/i, '.webp');
    const destUpToDate = fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs;
    if (!destUpToDate) {
      await sharp(src).webp({ quality: 82 }).toFile(dest);
      console.log(`webp: ${src} -> ${dest}`);
    }
    fs.unlinkSync(src);
    console.log(`removed source: ${src}`);
  }));
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
gulp.task('webp', webpTask);
gulp.task('watch', watch);

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.parallel('js', 'stylus', 'browser-sync', 'watch'));
