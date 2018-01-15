# angular-hello-world
A basic Angular 1.0 project using Gulp, Babel, UI-Router, SystemJS and JSPM

There is a lot to setting up a basic application with these technologies.
Hopefully this project and the notes below will help get interested people started.

Note that this is an Angular 1.0 project.
Aurelia is gaining popularity and Angular 2.0 is being built out at this time, so you may want to consider skipping on to those if you are just getting started with a new project.


Setup Steps (can expand / update / fix if there's interest).

# Steps used to create this project

## SETUP ENVIRONMENT

1. Install an IDE
	- Popular web development products
        - Visual Studio
        - Visual Studio Code
        - Web Storm

2. Install static code analysis plugins / tools
    - Some suggestions
        - jshint (for JS) (available for many environments)
        - stylelint (for CSS) (something I found for Visual Studio Code)
        - HTMLHint (for HTML) (something I found for Visual Studio Code)

3. Setup Source control on the local machine (Git for example)
4. Install NodeJS (system dependent binary)
5. Setup project folder
	- Using github.com
    	1. Create a repository there (on the website)
    	2. Clone the repository locally: git clone https://[githubusername]@github.com/[githubusername]/[project]
    - Using your own github or other SCM
		1. Create a project folder for the remote repository and CD into it.
        2. Initialize empty remote repository: git init --bare <repositoryname>.git
        3. Change to your local development machine and clone the project there: git clone <remote repository>
6. CD to your project folder
7. Initialize NPM for this folder (npm init) (take all defaults usually)
	- Creates the node_modules folder and the package.json file
    - Note: package.json is used to generate node_modules, so check-in package.json, but not node_modules
        1. git add package.json
        2. git commit -m “your commit message”
        3. git push origin (‘origin’ is the default name created by github)
8. Install Node based packages (npm install -g <package> <package> …)  
    (The -g is a global install flag. Use for development packages/tools)  
    (--save or --save-dev will remember the install by writing it to the package.json file)
	- npm install jspm -g (javascript package manager globally installed to get the jspm CLI)
    - npm install http-server -g (light-weight server, will serve root from whatever directory you run it in)
    - Anything else you want to install (mostly dev tools like A & B above)
9. Install JSPM again, but locally this time (no -g option) to store project settings/packages locally: npm install jspm --save-dev
10. Configure JSPM to default install from git (if using git): 
    - Generate a personal access token at github
    	1. Log in to github.com
        2. Go to https://github.com/settings/tokens
        3. Click “Generate new token”
        4. Enter the things you want the token to have access to (at least repo group)
        5. Copy the long hex string they give you  
    - jspm registry config github
    - Enter your username and paste the hex string for the password
11. Setup JSPM for use: jspm init  
      Asks if you’d like to use a transpiler (select Babel).  
      This creates jspm_pacakges and config.js in the local directory and adds JSPM config info to package.json
12. Install your JS framework (usually Angular or Aurelia) jspm install aurelia-framework (note there’s no –save for JSPM)
    - This adds packages to jspm_packages and entries to package.json.
    - Note: like node_modules, the jspm_packages folder is built by package.json, so it doesn’t need to be checked in. 
jspm install (not init!) will rebuild the jspm_packages folder.
13. Install additional packages/frameworks
    - UI framework like Angular Material
    - Routing framework like github:angular-ui/ui-router
14. Create a file called .gitignore at the top of your project directory (the one you cloned or initialized in the first few steps above)
    - Edit the file and add a line for each thing you want to git to ignore (so it isn’t part of source control)
    	1. node_modules
        2. jspm_packages

## CREATE ACTUAL APPLICATION CODE

15. Create a directory to put all your code in (code that runs application, not project setup stuff)
    - mkdir src at top level of project

16. Add a global style sheet
    - mkdir styles in src directory
    - vi styles/global.css

17. Add a favicon
    - mkdir assets in src directory
    - Add a png you want to be used for the site’s favicon. Name it apple-touch-icon-precomposed.png for the most universal acceptance.

18. Add a start point for the project
    - vi index.html (in src directory)
```html
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
```

19. Add the application start point
    - vi main.js (in src directory)


## SETUP THE BUILD / RUN SCRIPT

20. Install some base packages
npm install jspm --save-dev
    - npm install babel --save-dev (not sure if this is needed after installing jspm)
    - npm install gulp-babel --save-dev 
    - npm install babel-preset-es2015 --save-dev (if you don’t install this, you’ll get an error that looks like “Couldn't find preset "es2015" relative to directory”)
21. Create a directory to copy everything to and run from. This is what would be packaged up and put on a web server.
    - mkdir scripts (at top level of project folder, parallel with src directory) (using ‘scripts’ because aurelia does, but you can call it whatever you want, as long as you are consistent throughout the build scripts)
22. Create a build directory to do all your build work in
    - mkdir build (at top level of project folder)
23. Create a gulp instruction file in the build folder
    - vi Gulpfile.babel.js (calling it Gulpfile.babel.js instead of just Gulpfile.js tells gulp that it will be using the Babel transpiler)



## PUSH EVERYTHING TO SOURCE CONTROL

21. Add all your files (that aren’t being ignored due to .gitignore) to git tracking
    - git add .    (notice the ‘.’ there)
22. Commit the files you just added with a comment
    - git commit -m “First files of the project”
23. Push the committed files 
    - git push origin



## COMMON ERRORS

- “Argument 'module' is not a function, got Object”
	You may have tried to use a module reference rather than a module name in the dependency section of a module.
	ex:
		var appModule = angular.module('app', [
		    helloModule  // <- error, should be helloModule.name or “helloModule”
		]);
