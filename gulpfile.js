(function () {
    'use strict';
    var gulp = require('gulp'),
        annotate = require('gulp-ng-annotate'),
        bowerFiles = require('main-bower-files'),
        concat = require('gulp-concat'),
        gulpIgnore = require('gulp-ignore'),
        inject = require('gulp-inject'),
        jslint = require('gulp-jslint'),
        karma = require('karma').server,
        sass = require('gulp-sass'),
        templateCache = require('gulp-angular-templatecache');

    gulp.task('inject', function () {
        return gulp.src('./src/index.html')
            .pipe(inject(gulp.src(bowerFiles(), {'base': './dist/bower_components','read': false
            }), {
                'name': 'bower'
            }))
            .pipe(inject(gulp.src([
                './dist/main.css',
                './dist/app.js',
                './dist/templates.js'
            ])))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('sass', function () {
        return gulp.src('./src/main.scss')
            .pipe(sass())
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('jslint', function () {
        return gulp.src(['./src/**/*.js'])
            .pipe(jslint({
                errorsOnly: true
            }))
            .on('error', function (error) {
                console.error(String(error));
            });
    });

    gulp.task('js', ['jslint'], function () {
        return gulp.src('./src/**/*.js')
            .pipe(gulpIgnore.exclude('*.spec.js'))
            .pipe(concat('app.js'))
            .pipe(annotate())
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('bower', function() {
        return gulp.src(bowerFiles(), {base: './bower_components'})
            .pipe(gulp.dest('./dist/bower_components'));
    });

    gulp.task('templates', function () {
        return gulp.src(['./src/**/*.html', '!./src/index.html'])
            .pipe(templateCache('templates.js', {
                module: 'templates',
                standalone: true
            }))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('test', ['js', 'templates'], function (done) {
        karma.start({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, function () {
            done();
        });
    });

    gulp.task('images', function () {
        return gulp.src('./src/images/**/*')
            .pipe(gulp.dest('./dist/images/'));
    });

    gulp.task('watch', function () {
        gulp.watch('./src/index.html',      {interval: 500}, ['inject']);
        gulp.watch('./src/**/*.scss',       {interval: 500}, ['sass']);
        gulp.watch('./src/**/*.js',         {interval: 500}, ['js']);
        gulp.watch('./src/**/*.html',       {interval: 500}, ['templates']);
        gulp.watch('./src/images/*.jpg',    {interval: 500}, ['images']);
    });

    gulp.task('default', ['inject', 'sass', 'js', 'bower', 'templates', 'images', 'watch']);

    gulp.task('build', ['inject', 'sass', 'js', 'templates', 'images']);
}());
