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
        path.join('bower_components', 'lodash', 'dist', 'lodash.underscore.min.js'),
        path.join('bower_components', 'lodash', 'dist', 'lodash.min.js'),
        path.join('bower_components', 'jQuery', 'dist', 'jquery.min.js'),
        path.join('bower_components', 'ngInfiniteScroll', 'build', 'ng-infinite-scroll.min.js'),
        path.join('bower_components', 'angular-inview', 'angular-inview.js'),
        path.join('bower_components', 'modernizr', 'modernizr.js'),
        path.join('bower_components', 'require', 'build', 'require.js'),
        path.join('bower_components', 'angular-indexed-db', 'angular-indexed-db.min.js'),
        path.join('bower_components', 'angular-indexed-db', 'angular-indexed-db.js'),
        path.join('bower_components', 'uuid', 'rng-browser.js'),
        path.join('bower_components', 'uuid', 'rng.js'),
        path.join('bower_components', 'uuid', 'uuid.js'),
        path.join('bower_components', 'angular-uuid-service', 'uuid-svc.min.js'),

        path.join('bower_components', 'angular', 'angular.min.js.map'),
        path.join('bower_components', 'hammerjs', 'hammer.min.map'),
        path.join('bower_components', 'angular-animate', 'angular-animate.min.js.map'),
        path.join('bower_components', 'angular-aria', 'angular-aria.min.js.map'),
        path.join('bower_components', 'angular-route', 'angular-route.min.js.map'),
        path.join('bower_components', 'jQuery', 'dist', 'jquery.min.map'),
        path.join('bower_components', 'angular-indexed-db', 'angular-indexed-db.min.js.map')
    ]).pipe(gulp.dest(
        path.join(paths.dest, 'libs')
    ))
});

function cloneNodeModule(name){
    return gulp.src(path.join("node_modules", name, "**", "*")).pipe(gulp.dest(
        path.join(paths.dest, 'node_modules', name)
    ));
}

gulp.task("clone:node_modules:routes", ["create:build"], function(){
    return cloneNodeModule("routes")
});

gulp.task("clone:node_modules", ["clone:node_modules:routes"]);

gulp.task('clone:bower:b', [ 'create:build' ], function(){
    return gulp.src(
        path.join('bower_components', 'angular-material', 'themes', '*.css')
    ).pipe(gulp.dest(
        path.join(paths.dest, 'libs', 'themes')
    ))
});
gulp.task('clone:bower:c', [ 'create:build' ], function(){
    material = path.join('bower_components', 'material-design-icons');
    return gulp.src(
        [
            path.join(material, 'action', 'svg', 'ic_done*'),
            path.join(material, 'maps', 'svg', 'ic_local_shipping*'),
            path.join(material, 'maps', 'svg', 'ic_store_mall_directory*'),
            path.join(material, 'action', 'svg', 'ic_settings*'),
            path.join(material, 'action', 'svg', 'ic_trending*'),
            path.join(material, 'action', 'svg', 'ic_account*'),
            path.join(material, 'action', 'svg', 'ic_extension*'),
            path.join(material, 'communication', 'svg', 'ic_forum*'),
            path.join(material, 'content', 'svg', 'ic_add*'),
            path.join(material, 'content', '1x_web', 'ic_add*'),
            path.join(material, 'navigation', 'svg', 'ic_more_vert*'),
            path.join(material, 'action', '1x_web', 'ic_search*'),
            path.join(material, 'navigation', '1x_web', 'ic_menu*'),
            path.join(material, 'navigation', '1x_web', 'ic_arrow*'),
            path.join(material, 'action', 'svg', 'ic_home*')
        ]
    ).pipe(gulp.dest(
        path.join(paths.dest, 'images', 'icons')
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
    "clone:bower:c",
    "clone:node_modules"
    //'build:uglify',
    //'build:uglify:bower'
];

gulp.task('develop', develop, function(){
    gulp.watch(paths.src.coffee, develop);
    gulp.watch(paths.src.less, develop);
    gulp.watch(paths.src.jade, develop);
});

gulp.task('default', [ 'develop' ]);