var gulp    = require('gulp'),
    coffee  = require("gulp-coffee"),
    less    = require('gulp-less'),
    jade    = require('gulp-jade'),
    path    = require('path'),
    mkdirp  = require('mkdirp'),
    async   = require('async'),
    rimraf  = require('gulp-rimraf'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    lr      = require( 'tiny-lr' );

lrServer    = lr()

paths = {
    build: 'build',
    src: {
        coffee: path.join('src', '**', '*.coffee'),
        jade: path.join('src', '**', '*.jade'),
        less: path.join('src', '**', '*.less'),
        images: path.join('src', 'images', '**', '*'),
        fonts: path.join('src', 'fonts', '**', '*')
    },
    dest: path.join('build', 'testing')
};

gulp.task('clean:build', function() {
    return gulp.src( paths.build, { read: false })
        .pipe( rimraf( { force: true } ) )
});

gulp.task('create:build', ['clean:build'], function(done) {
    async.each( [ paths.dest ], function( directory, next ){
        mkdirp( directory, next )
    }, done )
});

gulp.task('clone:bower:a', [ 'create:build' ], function(){
    return gulp.src([
        path.join('bower_components', 'angular', 'angular.min.js'),
        path.join('bower_components', 'hammerjs', 'hammer.min.js'),
        path.join('bower_components', 'angular-animate', 'angular-animate.min.js'),
        path.join('bower_components', 'angular-aria', 'angular-aria.min.js'),
        path.join('bower_components', 'angular-material', 'angular-material.js'),
        path.join('bower_components', 'angular-material', 'angular-material.min.css'),
        path.join('bower_components', 'angular-route', 'angular-route.min.js'),

        path.join('bower_components', 'angular', 'angular.min.js.map'),
        path.join('bower_components', 'hammerjs', 'hammer.min.map'),
        path.join('bower_components', 'angular-animate', 'angular-animate.min.js.map'),
        path.join('bower_components', 'angular-aria', 'angular-aria.min.js.map'),
        path.join('bower_components', 'angular-route', 'angular-route.min.js.map')
    ]).pipe(gulp.dest(
        path.join(paths.dest, 'libs')
    ))
});
gulp.task('clone:bower:b', [ 'create:build' ], function(){
    return gulp.src(
        path.join('bower_components', 'angular-material', 'themes', '*.css')
    ).pipe(gulp.dest(
        path.join(paths.dest, 'libs', 'themes')
    ))
});

gulp.task('build:coffee', [ 'create:build' ], function () {
    return gulp.src(paths.src.coffee)
        .pipe(coffee())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('build:less', [ 'create:build' ], function () {
    return gulp.src('./src/main.less')
        .pipe(less())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('build:jade', [ 'create:build' ], function () {
    return gulp.src(paths.src.jade)
        .pipe(jade())
        .pipe(gulp.dest(paths.dest));
});

gulp.task("build:concat:bower:js", [ 'build:coffee', 'clone:bower:a', 'clone:bower:b' ], function(){
    return gulp.src(path.join(paths.dest, 'libs', '**', '*.js'))
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(paths.dest))
});

gulp.task("build:concat:js", [ 'build:coffee', "build:concat:bower:js" ], function(){
    return gulp.src(path.join(paths.dest, 'app', '**', '*.js'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.dest))
});

gulp.task('build:uglify:bower', ['build:concat:js'], function(){
    return gulp.src(path.join(paths.dest, 'bower.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest))
});

gulp.task('build:uglify', ['build:concat:js', ], function(){
    return gulp.src(path.join(paths.dest, 'app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest))
});

var develop = [
    'clean:build',
    'create:build',
    'build:coffee',
    'build:less',
    'build:jade',
    "build:concat:js",
    'build:uglify',
    //'build:uglify:bower'
]

gulp.task('develop', develop, function(){
    lrServer.listen( 35729, function(err){
        gulp.watch(paths.src.coffee, develop);
        gulp.watch(paths.src.less, develop);
        gulp.watch(paths.src.jade, develop);
    })
});

gulp.task('default', [ 'develop' ]);