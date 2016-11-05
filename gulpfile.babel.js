// const gulp = require('gulp');
// const babel = require('gulp-babel');
// const del = require('del');
// const exec = require('child_process').exec;

/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
// import { exec } from 'child_process';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*/js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    clientBundle: 'dist/client-bundle.js?(.map)',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: "webpack.config.babel.js",
    libDir: 'lib',
    distDir: 'dist',
};

gulp.task('clean', () => del([
    paths.libDir,
    paths.clientBundle,
]));

gulp.task('lint', () => 
    gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
        paths.webpackFile,
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['lint', 'clean'], () =>
    gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir))
);

gulp.task('main', ['lint', 'clean'], () =>
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);
// gulp.task('main', ['build'], (callback) => {
//     exec(`node ${paths.libDir}`, (error,stdout) => {
//         console.log(stdout);
//         return callback(error);
//     });
// });

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
