/**
 * This is the build file that gulp uses.
 * A plain gulp build file would be called gulpfile.js by default. Putting 'babel' in the middle of the name tells gulp that it's going to use the Babel cross compiler. See https://babeljs.io/
 * To start the build, cd to the directory where the gulpfile.babel.js build file (this file) is and execute the command 'gulp'.
 */

import gulp from 'gulp'; // get gulp support so this javascript file can execute gulp commands
import babel from 'gulp-babel'; // get babel support. You may see an error about not being able to find 'es2015' if you don't have this. You need to add the babel presets 2015 instruction to package.json as well.
import express from 'express'; // server (for development purposes)

/**
 * These are paths to the various parts of the application.
 */
var paths = {
    js: '../src/**/*.js',   // The **/* pattern means grab everything recursively from this point ('../src') down.
    html: '../src/**/*.html',
    styles: '../src/**/*.css',
    assets: '../src/**/*',
    config: '../config.js',

    scripts: '../scripts' // This is the output directory. Using 'scripts' here, but you can use anything as long as it's consistent through all the build code.
};

/**
 * Node doesn't have support for mapping sigint or sigterm to Windows keyboard input.
 * This code does some mapping to enable you to stop the node express server by using ctrl-c in Windows.
 * Got this code off of stack overflow here: http://stackoverflow.com/a/14861513
 */
var enableControlCBreakOnWindows = function() {
    if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
    }

    process.on("SIGINT", function () {
    //graceful shutdown
    process.exit();
    });
};

/**
 * Start a Node Express server to serve up the application
 */
var startServer = function () {
    var app = express();

    app.use('/jspm_packages', express.static('../jspm_packages')); // Tell the express server to map /jspm_packages to ../jspm_packages

    app.use('/', express.static('../scripts')); // Tell the express server to use the scripts directory for it's root

    var server = app.listen(8080, () => { // Start the express server on port 8080
        console.log('running!');
    });
};

/**
 * The default gulp task (where gulp starts doing stuff)
 * Name: 'default'
 * Dependendencies are listed in the square brackets of the 2nd parameter
 * The third parameter is the function that is run as the default task
 */
gulp.task('default', ['js', 'html', 'styles', 'config'], () => {
    enableControlCBreakOnWindows();
    startServer();
});

gulp.task('config', [], () => {
    gulp.src(paths.config)
    .pipe(gulp.dest(paths.scripts));
});

gulp.task('js', [], () => {
    gulp.src(paths.js)
    //.pipe(babel())
    .pipe(gulp.dest(paths.scripts));
});

gulp.task('html', [], () => {
    gulp.src(paths.html)
    .pipe(gulp.dest(paths.scripts));
});

gulp.task('styles', [], () => {
    gulp.src(paths.styles)
    .pipe(gulp.dest(paths.scripts));
});