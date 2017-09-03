/**
 * Created by niupark on 2017/5/5.
 */
var gulp = require('gulp');
// var ts = require('gulp-typescript');
// var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
// var tsProject = ts.createProject('tsconfig.json');


gulp.task("clean", function(){
    return gulp.src('./dist/')
        .pipe(clean());
})

gulp.task('copy', ['clean'], function() {
    return gulp.src('configes/*.json')
        .pipe(gulp.dest('dist/configes/'));
});


/*************************************
 *同样的配置，通过 gulp-sourcemaps 生成的map文件，在vscode中 无法debug，原因不明
 *现在使用tsc命令直接编译ts文件
*/
// gulp.task('compile' ,['copy'], function () {
//     return tsProject.src()
//         .pipe(sourcemaps.init())
//         .pipe(tsProject())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('compile' ,['copy'], shell.task([
    'tsc'
]));


var JSCOVERAGE = './node_modules/.bin/istanbul cover _mocha ./dist/src/tests/**/*.js';
var MOCHA =  './node_modules/.bin/mocha -R spec  -t 10000 ./dist/src/tests/**/*.js';

gulp.task('test', shell.task([
    MOCHA
]));

gulp.task('test-cov', shell.task([
    JSCOVERAGE,
    MOCHA
]));