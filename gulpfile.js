(function () {
    "use strict";
    var gulp = require("gulp"),
        inject = require("gulp-inject"),
        sass = require("gulp-sass"),
        concat = require("gulp-concat"),
        // watch = require("gulp-watch"),
        templateCache = require("gulp-angular-templatecache"),
        annotate = require("gulp-ng-annotate"),
        karma = require("karma").server,
        jslint = require("gulp-jslint"),
        gulpIgnore = require("gulp-ignore"),
        bowerFiles = require("main-bower-files");

    gulp.task("inject", function () {
        return gulp.src("./src/index.html")
            .pipe(inject(gulp.src(bowerFiles(), {
                "base": "./dist/bower_components",
                "read": false
            }), {
                "name": "bower",
                "ignorePath": "dist",
                "addPrefix": "/dist/client-side"
            }))
            .pipe(gulp.dest("./dist/"));
    });

    gulp.task("sass", function () {
        return gulp.src("./src/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./dist/"));
    });

    gulp.task("jslint", function () {
        return gulp.src(["gulpfile.js", "./src/**/*.js"])
            .pipe(jslint({
                errorsOnly: true // only display output for files with errors
            }))
            .on("error", function (error) {
                console.error(String(error));
            });
    });

    gulp.task("js", ["jslint"], function () {
        return gulp.src("./src/**/*.js")
            .pipe(gulpIgnore.exclude("*.spec.js"))
            .pipe(concat("app.js"))
            .pipe(annotate())
            .pipe(gulp.dest("./dist/"));
    });

    gulp.task("templates", function () {
        return gulp.src("./src/**/*.html")
            .pipe(templateCache("templates.js", {
                module: "templates",
                standalone: true
            }))
            .pipe(gulp.dest("./dist/"));
    });

    gulp.task("test", ["js", "templates"], function (done) {
        karma.start({
            configFile: __dirname + "/karma.conf.js",
            singleRun: true
        }, function () {
            done();
        });
    });

    gulp.task("images", function () {
        return gulp.src("./src/images/**/*")
            .pipe(gulp.dest("./dist/images/"));
    });


    gulp.task("watch", function () {
        gulp.watch("./src/index.html", {interval: 500}, ["inject"]);
        gulp.watch("./src/**/*.scss", {interval: 500}, ["sass"]);
        gulp.watch("./src/**/*.js", {interval: 500}, ["js", "test"]);
        gulp.watch("./src/**/*.html", {interval: 500}, ["templates"]);
        gulp.watch("./src/images/*.jpg", {interval: 500}, ["images"]);
    });

    gulp.task("default", ["inject", "sass", "js", "templates", "test", "images", "watch"]);

    gulp.task("build", ["inject", "sass", "js", "templates", "test", "images"]);
}());
