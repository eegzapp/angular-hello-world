# angular-hello-world
A basic Angular 1.0 project using Gulp, Babel, UI-Router, SystemJS and JSPM

There is a lot to setting up a basic application with these technologies.
Hopefully this project and the notes below will help get interested people started.

Note that this is an Angular 1.0 project.
Aurelia is gaining popularity and Angular 2.0 is being built out at this time, so you may want to consider skipping on to those if you are just getting started with a new project.


Setup Steps (can expand / update / fix if there's interest).

SETUP ENVIRONMENT

  1. Install an IDE
     A. Popular web development products
          i. Visual Studio
          ii. Visual Studio Code
          iii. Web Storm

  2. Install static code analysis plugins / tools
     A. Some suggestions
          i. jshint (for JS) (available for many environments)
          ii. stylelint (for CSS) (something I found for Visual Studio Code)
          iii. HTMLHint (for HTML) (something I found for Visual Studio Code)

  3. Setup Source control on the local machine (Git for example)
  4. Install NodeJS (system dependent binary)
  5. Setup project folder
     A. Using github.com
          i. Create a repository there (on the website)
         ii. Clone the repository locally git clone https://github/user/project
     B. Using your own github or other SCM
          i. Create a project folder for the remote repository and CD into it.
         ii. Initialize empty remote repository: git init --bare <repositoryname>.git
        iii. Change to your local development machine and clone the project there: git clone <remote repository>
  6. CD to your project folder
  7. Initialize NPM for this folder (npm init) (take all defaults usually)
     A. Creates the node_modules folder and the package.json file
     B. Note: package.json is used to generate node_modules, so check-in package.json, but not node_modules
          i. git add package.json
         ii. git commit -m “your commit message”
        iii. git push origin (‘origin’ is the default name created by github)
  8. Install Node based packages (npm install -g <package> <package> …)
     (The -g is a global install flag. Use for development packages/tools)
     (--save or --save-dev will remember the install by writing it to the package.json file)
      A. npm install jspm -g (javascript package manager globally installed to get the jspm CLI)
      B. npm install http-server -g (light-weight server, will serve root from whatever directory you run it in)
      C. Anything else you want to install (mostly dev tools like A & B above)
  9. Install JSPM again, but locally this time (no -g option) to store project settings/packages locally: npm install jspm --save-dev
10. Configure JSPM to default install from git (if using git): 
      A. Generate a personal access token at github
          i. Log in to github.com
          ii. Go to https://github.com/settings/tokens
          iii. Click “Generate new token”
          iv. Enter the things you want the token to have access to (at least repo group)
          v. Copy the long hex string they give you  
      B. jspm registry config github
      C. Enter your username and paste the hex string for the password
11. Setup JSPM for use: jspm init
      Asks if you’d like to use a transpiler (select Babel).
      This creates jspm_pacakges and config.js in the local directory and adds JSPM config info to package.json
12. Install your JS framework (usually Angular or Aurelia) jspm install aurelia-framework (note there’s no –save for JSPM)
      A. This adds packages to jspm_packages and entries to package.json.
      B. Note: like node_modules, the jspm_packages folder is built by package.json, so it doesn’t need to be checked in. 
jspm install (not init!) will rebuid the jspm_packages folder.
13. Install additional packages/frameworks
      A. UI framework like Angular Material
      B. Routing framework like github:angular-ui/ui-router
14. Create a file called .gitignore at the top of your project directory (the one you cloned or initialized in the first few steps above)
      A. Edit the file and add a line for each thing you want to git to ignore (so it isn’t part of source control)
          i. node_modules
          ii. jspm_packages

CREATE ACTUAL APPLICATION CODE

15. Create a directory to put all your code in (code that runs application, not project setup stuff)
      A. mkdir src at top level of project

16. Add a global style sheet
      A. mkdir styles in src directory
      B. vi styles/global.css

17. Add a favicon
      A. mkdir assets in src directory
      B. Add a png you want to be used for the site’s favicon. Name it apple-touch-icon-precomposed.png for the most universal acceptance.

18. Add a start point for the project
      A. vi index.html (in src directory)
        <!DOCTYPE html>
        <html>
            <head>
                <title>Angular Hello World Project</title>

                <!-- Note that all paths below are based on where they are at run time. This may be different than what the directory looks like at build time if you publish the site (using gulp or a .war file for instance). This is very common in production environments. -->

                <link rel="stylesheet" href="/styles/global.css" />
                <link rel="shortcut icon" type="image/png" href="assets/apple-touch-icon-precomposed.png"> <!-- apple-touch-icon-precomposed.png is the most compatible name across platforms -->
                <script src="/jspm_packages/system.js"></script> <!-- Include the SystemJS loader. This has to be done in HTML. After this, code can be loaded using SystemJS. -->
                <script>System.import("/main")</script> <!-- Import the main.js file using the SystemJS loader. Main.js is the functional start point of the application (index.html is just the landing point) -->
            </head>
            <body>
                <ui-view></ui-view> <!-- This is where ui-router shows pages -->
            </body>
        </html>
      B. Note that all paths below are based on where they are at run time. This may be different than what the directory looks like at build time if you publish the site (using gulp or a .war file for instance). This is very common in production environments.

19. Add the application start point
      A. vi main.js (in src directory)


SETUP THE BUILD / RUN SCRIPT

20. Install some base packages
npm install jspm --save-dev
      A. npm install babel --save-dev (not sure if this is needed after installing jspm)
      B. npm install gulp-babel --save-dev 
      C. npm install babel-preset-es2015 --save-dev (if you don’t install this, you’ll get an error that looks like “Couldn't find preset "es2015" relative to directory”)
21. Create a directory to copy everything to and run from. This is what would be packaged up and put on a web server.
      A. mkdir scripts (at top level of project folder, parallel with src directory) (using ‘scripts’ because aurelia does, but you can call it whatever you want, as long as you are consistent throughout the build scripts)
22. Create a build directory to do all your build work in
      A. mkdir build (at top level of project folder)
23. Create a gulp instruction file in the build folder
      A. vi Gulpfile.babel.js (calling it Gulpfile.babel.js instead of just Gulpfile.js tells gulp that it will be using the Babel transpiler)


PUSH EVERYTHING TO SOURCE CONTROL

24. Add all your files (that aren’t being ignored due to .gitignore) to git tracking
      A. git add .    (notice the ‘.’ there)
25. Commit the files you just added with a comment
      A. git commit -m “First files of the project”
26. Push the committed files 
      A. git push origin



COMMON ERRORS

- “Argument 'module' is not a function, got Object”
	You may have tried to use a module reference rather than a module name in the dependency section of a module.
	ex:
		var appModule = angular.module('app', [
		    helloModule  // <- error, should be helloModule.name or “helloModule”
		]);
