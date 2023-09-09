const { src, dest, watch , parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const cache = require('gulp-cache');

const paths = {
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*'
}


function javascript() {
    return src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js')) // final output file name
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('./dist/js'))
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(dest('dist/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}



function watchArchivos() {
    watch( paths.js, javascript );
    watch( paths.imagenes, imagenes );
}
  
exports.default = parallel(javascript,  imagenes,  watchArchivos ); 