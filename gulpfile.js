var gulp = require('gulp');
var webpack = require('webpack')
var gulpWebpack = require('gulp-webpack')
var livereload = require('gulp-livereload');


gulp.task('bundle', function () {
  gulp.src('app/scripts/page.js')
    .pipe(gulpWebpack({
        watch: true,
        output: {
          filename: 'main.js',
        //  chunkFilename: "[id].js",
        //  path: path.resolve(__dirname, 'dist')
        },
        module: {
            loaders: [
                 {test: /\.css$/, loader: 'style-loader!css-loader'},
            ]
        },
      }, webpack
      )
    )
    .pipe(gulp.dest('./app/dest/'));
});

gulp.task('html', function () {
  livereload.reload();
});

gulp.task('watch', function () {
  livereload.listen()
  gulp.watch([
    './app/dest/main.js'
  ], ['html']);
})


gulp.task('default', ['watch', 'bundle']);
