// Karma configuration
// Generated on Tue Apr 07 2015 04:15:45 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'static/bower_components/fastclick/lib/fastclick.js',
      'static/bower_components/jquery/dist/jquery.js',
      'static/bower_components/angular/angular.js',
      'static/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'static/bower_components/angular-ui-router/release/angular-ui-router.js',
      'static/bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'static/bower_components/angular-mocks/angular-mocks.js',
      'static/bower_components/tv4/tv4.js',
      'static/bower_components/angular-sanitize/angular-sanitize.js',
      'static/bower_components/objectpath/lib/ObjectPath.js',
      'static/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'static/bower_components/angular-schema-form/dist/schema-form.js',
      'static/bower_components/angular-schema-form/dist/bootstrap-decorator.js',
      'static/bower_components/angular-ui-ace/ui-ace.js',
      'static/bower_components/ng-sortable/dist/ng-sortable.js',
      'static/bower_components/ace-builds/src-min-noconflict/ace.js',
      'static/templates.js',
      'src/**/*.js',
      'src/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/**/!(*spec).js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan', 'coverage'],

    coverageReporter: {
        dir: 'static/reports',
        subdir: 'coverage'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
