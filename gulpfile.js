//extrae todas las funcionalidades del archivo gulp y las trae a gulp file
//{}aqui importamos las funciones que vienen de gulp
//src identificar un archivo dest sirve para guardar ese archivo

const { src, dest, watch, parallel } = require('gulp');
//dependencias de css
const sass = require('gulp-sass')(require('sass'));//utilizar gulp sass posteriormente ve y busca esa dependencia de sass
const plumber = require('gulp-plumber');
const autoprefixer=require('autoprefixer');
const cssnano=require('cssnano');
const postcss=require('gulp-postcss');
const sourcemaps=require('gulp-sourcemaps');

//javascript
const terser=require('gulp-terser-js');

//imagenes
const imagMin=require('gulp-imagemin');
const webp = require('gulp-webp');
const cache=require("gulp-cache");
const avif=require("gulp-avif");


const css = (done => {
    src('src/scss/**/*.scss')//identificar el archibo de sass **/* para identificar todos los archivos de sass
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())//compilarlo
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))//Almacenar en el disco duro 
    done();
});


const versionWebp = (done => {

    const calidad = {
        quality: 50
    };
    //identifico las imagenes
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(calidad))
        .pipe(dest('build/img'))
    done();
});

const imagenes=(done=>{
    const opciones={
        optimizationLevel:3
    }
    //identifico las imagenes
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagMin(opciones)))
    .pipe(dest('build/img'))

    done();
})

const versionAvif=(done=>{
    const opciones={
        quality:50
    }
    //identifico las imagenes
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))

    .pipe(dest('build/img'))
    done();
});


const javascript=(done=>{
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))
    done();
});

const dev = (done => {
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    done();
});



exports.css=css;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.imagenes=imagenes;
exports.javascript=javascript;
exports.dev=parallel(imagenes,versionWebp,versionAvif,javascript,dev);


