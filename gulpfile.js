(function () {
    'use strict';
    var _, path, bowerFiles, gulp, KarmaServer, plugins, src, watches, js, lazypipe,
        templates, through2, runSequence, argv, config;

    _ = require('lodash');
    path = require('path');
    bowerFiles = require('main-bower-files');
    gulp = require('gulp');
    KarmaServer = require('karma').Server;
    lazypipe = require('lazypipe');
    plugins = require('gulp-load-plugins')();
    runSequence = require('run-sequence');

    argv = require('minimist')(process.argv.slice(2));
    argv.env = (argv.env === 'production') ? 'production' : 'dev';
    argv.dslogon_url = argv.dslogon_url || '/dslogon/';

    src = {};
    through2 = require('through2');
    watches = {};

    config = {
        src: 'src',
        dist: ''
    };

    function start(task) {
        return function () {
            return gulp.start(task);
        };
    }

    function plumber() {
        return plugins.plumber({
            /*eslint no-console:0*/
            errorHandler: function (error) {
                console.error(String(error));
                this.emit('end');
            }
        });
    }

    function plumbedSrc() {
        return gulp.src.apply(gulp, arguments).pipe(plumber());
    }

    function watch(src, cb) {
        return plugins.watch(src, {
            usePolling: true,
            interval: 500
        }, cb);
        // Note: polling is needed due to lack of fs events on vboxsf
    }

    function batchWatch(src, opts) {
        _.defaults(opts, {
            pipe: plugins.util.noop,
            cb: function (done) { done(); }
        });

        return watch(src, plugins.batch({ timeout: 10 }, function (events, done) {
            events
                .pipe(opts.pipe())
                .pipe(plugins.util.buffer(function () {
                    opts.cb(done);
                }));
        }));
    }

    function cleanCache(cacheName) {
        /*eslint no-unused-vars:0*/
        return lazypipe().pipe(through2.obj, function (file, enc, cb) {
            if (file.event === 'unlink') {
                delete plugins.cached.caches[cacheName][file.path];
                plugins.remember.forget(cacheName, file.path);
            } else {
                this.push(file);
            }
            cb();
        });
    }

    function test(done) {
        var KarmaFiles = null,
            KarmaStub = { set: function (config) { KarmaFiles = config.files; }};
        require('./karma.conf.js')(KarmaStub);


        if (argv.m) {
            KarmaFiles.pop();
            KarmaFiles.push(path.join('src', argv.m, '**', '**.spec.js'));
        }

        var server = new KarmaServer({
            configFile: __dirname + '/karma.conf.js',
            files: KarmaFiles,
            singleRun: true
        }, function () {
            done();
        });

        server.start();
    }

    gulp.task('test', ['js', 'templates'], test);
    function test_ci() {
        var server = new KarmaServer({
            configFile: __dirname + '/karma.conf.js',
            autoWatch: true,
            singleRun: false
        });

        server.start();
    }

    src.inject = 'src/index.html';
    function inject() {
        return plumbedSrc(src.inject)
            .pipe(plugins.inject(gulp.src(bowerFiles(), {
                'base': './bower_components',
                'read': false
            }), {
                'name': 'bower',
                'ignorePath': 'dist'
            }))
            .pipe(plugins.preprocess({
                context: {
                    env: argv.env
                }
            }))
            .pipe(gulp.dest('./dist/'))
            .pipe(plugins.livereload());
    }
    gulp.task('inject', inject);
    watches.inject = function () {
        watch(src.inject, start('inject'));
    };

    function sass() {
        return plumbedSrc('src/main.scss')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest('dist/'))
            .pipe(plugins.livereload());
    }
    gulp.task('sass', sass);
    watches.sass = function () {
        watch('src/**/*.scss', start('sass'));
    };

    src.js = ['src/**/*.js', '!src/**/*.spec.js'];
    js = lazypipe()
        .pipe(plugins.cached, 'js')
        .pipe(plugins.ngAnnotate)
        .pipe(plugins.remember, 'js')
        .pipe(plugins.concat, 'app.js')
        .pipe(gulp.dest, 'dist/')
        .pipe(plugins.livereload);
    gulp.task('js', function () {
        return plumbedSrc(src.js).pipe(js());
    });
    watches.js = function () {
        batchWatch(src.js, {
            pipe: cleanCache('js').pipe(js)
        });
    };

    src.templates = ['src/**/*.html', '!src/index.html'];
    templates = lazypipe()
        .pipe(plugins.cached, 'templates')
        .pipe(plugins.remember, 'templates')
        .pipe(plugins.angularTemplatecache, 'templates.js', {
            module: 'templates',
            standalone: true
        })
        .pipe(plugins.preprocess, {
            extension: 'html',
            context: {
                DSLOGON_URL: argv.dslogon_url
            }
        })
        .pipe(gulp.dest, 'dist/')
        .pipe(plugins.livereload);
    gulp.task('templates', function () {
        return gulp.src(src.templates).pipe(templates());
    });
    watches.templates = function () {
        batchWatch(src.templates, {
            pipe: cleanCache('templates').pipe(templates)
        });
    };

    src.eslint = ['gulpfile.js', 'src/**/*.js'];
    gulp.task('eslint', function () {
        var source = ['gulpfile.js', 'src/**/*.js'];
        if (argv.m) {
            source.pop();
            source.push(path.join('src', argv.m, '**', '*.js'));
        }

        return plumbedSrc(source)
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format('stylish'));
    });
    watches.eslint = function () {
        watch(src.eslint)
            .pipe(plumber())
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format('stylish'));
    };

    src.images = 'src/images/**/*';
    function images() {
        return gulp.dest('dist/images/');
    }
    gulp.task('images', function () {
        return gulp.src(src.images).pipe(images());
    });
    watches.images = function () {
        watch(src.images).pipe(images());
    };

    src.fonts = 'src/fonts/**/*';
    function fonts() {
        return gulp.dest('dist/fonts/');
    }
    gulp.task('fonts', function () {
        return gulp.src(src.fonts).pipe(fonts());
    });
    watches.fonts = function () {
        watch(src.fonts).pipe(fonts());
    };

    gulp.task('build', ['inject', 'sass', 'js', 'templates', 'images', 'fonts']);

    gulp.task('build:test', ['build'], function (callback) {
        runSequence('eslint', 'test', callback);
    });

    gulp.task('build:watch', ['build', 'eslint'], function () {
        gulp.src('./dist/')
            .pipe(plugins.serverLivereload({
                livereload: true,
                defaultFile: 'index.html',
                open: true
            }));

        _.each(watches, function (fn) {
            fn();
        });
    });

    gulp.task('build:ci', ['build:watch'], test_ci);

    gulp.task('default', ['build:watch']);
}());
