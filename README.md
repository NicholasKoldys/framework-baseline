# Framework-Baseline
This project is a experiment and learning method to understand bundlers and how they fit in with other js packages to form an automated system that can perform multiple services, and act as a development environment with autonomous continuous integration.

## Why

Use this framework to create a public facing frontend UI and to use JS Module Libraries.

This framework will assist in dynamic naming of files for cache busting, limit the amount of cross file changes of feature additions, and to mock API data points for agile development.

## Framework Components

| ..      | ::  | scope |   .desc.   |
| ------- | --- | ----- | ---------- |
| Package Management | PNPM | global | manages JS packages for use in libraries - uses symlinks for less bloat. |
| Bundling | Webpack | dev-dep | "bundles" js files to form a compressed js import, vital with managing modules and importing libraries into public facing JS.  Has many other functionalities 'bundled' in. |
| Minification | Webpack Plugin | dev-dep | (minify/uglify) removes comments, whitespace, and can refactor code into separate files |
| CSS Preprocessor | SASS | dev-dep | (scss) |
| Source Maps | Webpack Plugin | dev-dep | when bundlers minify code it can become unreadable and with additions it can look very different from original code, so the Source Map creates a viewable experience for debugging, and can also hide/limit errors to command-lines. |
| Transpiling | Babel | global | Acts as a JS compiler that prepares code for browsers across many devices, and implements useful features (Typescript allows Typechecking) while also including newer JS features for older browsers |
| Dynamic HTML Generation | React/ NodeJS | global or dev | instead of adding html to documents it is recommended to do this a little as possible &&&& |
| Centralized HTTP | NodeJS | global | testing network access with packet and header control. |
| Mock API Framework | JSF.js | dev-dep | json-schema-faker -- used to code quick APIs &&&&& |
| Offline Compatibility | WorkBox | dev-dep | (Webpack Plugin) Service workers, workbox is the dependency but can be used in a webpack plugin for dynamic naming of files, or updating fields. |
| Image Optimizer | Webpack Plugin | dev-dep | |
| Development Webserver | ExpressJS | dev-dep | using express as its straight forward, quick with making routes.  I could have went with the built in webpack dev-server but this creates a dev-sinkhole, where you must reverse engineer a problem to solve a bug, but going through expressJS is out of the box easy to configure and provides an easy abstraction layer. |
| Dev Share Webserver | localtunnel.js | dev-dep | provides easy push a wait cli. |
| DEMO | Github Pages |  | straight forward, shows use cases, and provides all used APIs |
| CI Pipeline | {see below} | global/ dev-dep/ cloud | must be automated. |
| Component Libraries | {see below} | dev-dep | allows multiple use cases makes coding quicker, performant, and customized |

### Continuous Integration Pipeline

| Automated | ::  | .desc.  |
| --------- | --- | ------- |
| Continuous Integration |  | Jenkins / Appveyor(windows) / TravisCI(linux) |
| Testing | Mocha | with Chai assertion library |
| Linting | ESLint | |
| Build | Webpack | |
| Deployment | Webpack | |

    Each feature added should be up to date and not relied on by other libraries. (No installing without determining impact or risk).

### Component File Tree

| Arch | Type | Desc. | Contents |
| ---- | ---- | ----- |--------- |
| buildScripts | dir | contains js files for npm build scripts or generating resources to be used in js frontend. These files will NOT be bundled. (ie. devServer = starts the dev server from src, distServer = starts a dev server with the dist file to mock prod ) | <ul><li>distServer.js</li><li>generateMockData.js</li><li>mockDataSchema.js</li><li>devServer.js</li><li>startMessage.js</li><li>testSetup.js</li></ul> |
| dist | dir | contains production ready files, result from webpack build process |
| node_modules | dir | contains all dev dependencies and their dependencies |
| public | dir | contains files that can be accessed directly from a browser | <ul><li>index.css</li><li>index.html</li></ul> |
| src | dir | contains all code that is considered logic in the app. This WILL be bundled. API folder contains dev logic that should not be built for production. | <ul><li>api :</li><li>index.js</li><li>index.test.js</li><li>index.js</li><li>src-sw.js</li><li>sw-reg.js</li><li>vendor.js</li></ul> |
| api | src/dir | contains all code that can be created into separate API logic | <ul><li>baseUrl.js</li><li>db.json</li><li>userApi.js</li></ul> |

    |   .babelrc                 > babel config = which devices to target
    │   .eslintrc.json           > ESLint = which rules to lint
    │   package.json             > Contains Dependencies and npm scripts
    │   procron.sh               > File for daily automation.
    │   webpack.config.dev.js    > Config for dev environment --watch on file changes
    │   webpack.config.prod.js   > Config for building to dist folder, lint, test, and CI
    │
    ├───buildScripts
    │       distServer.js        > Creates a dev server from dist directory 'npm run prodtest'
    │       generateMockData.js  > Parses the mock data scheme and writes it to 
    |                               a api/db.json file 
    |                               'npm mock:userdata|start-mockapi'
    │       mockDataSchema.js    > Creates a config data scheme for JSF 
    |                               'npm mock:userdata|start-mockapi'
    │       devServer.js         > starts a dev server from src directory. 'npm run start'
    │       startMessage.js      > Displays a message a the start of 'npm run start'
    │       testSetup.js         > Creates a test command line 
    |                               reporter that styles the testing output 
    |                               'npm run test|test:watch'
    │
    ├───dist
    ├───public
    |   |
    │   │───js                   > contains js directly 
    |   |                         connected to the shell
    |   |
    |   |───style                > contains style directly 
    |   |                         connected to the shell
    │   │
    │   ├───icons
    │   │       apple-touch.png
    │   │       favicon.svg
    │   │       logo-128.png
    │   │       logo-192.png
    │   │       logo-384.png
    │   │       logo-48.png
    │   │       logo-512.png
    │   │       logo-72.png
    │   │       logo-96.png
    │   │       maskable-1024.png
    │   │
    |   |   index.html          > Main HTML Shell Template
    │   
    └───src
        │   index.js            > JS entry point for a webpack bundle. (multiple allowed)
        │   [f_name].test.js    > Test functions for specific file
        │   sw-reg.js           > sw registry that is added dynamically 
        |                        to entry-points
        │   src-sw.js           > sw event logic
        │   vendor.js           > Allows bundle splitting third party
        |                         libraries from app code 
        │
        └───api                 > Acts as a microservice library simple implementation
            |    baseUrl.js     > Logic to switch if db or mock used in userAPI
            |    db.json        > Generated from generateMockData.js / Acts as db
            |    userApi.js     > Logic used in CRUD with user data 

### Component Libraries

- webpack
- expressJS
- chalk
- compression
- mocha
- chai
- path.js -> allows
- jsdom.js -> assists in testing with unit tests.

## Code Smells

- test files should be next to each file and coded in conjunction with the current file.
- unit tests should be fast and should test a single function of code.
- unit tests shouldn't hit external resources.
- unit test should run on save.
- integration tests should involve spinning up test servers and testing database logic.
- CSS should NEVER be written inline, or non-class manipulation in JS.
- CSS should be an external file added onto the pages that it styles.
- centralize api calls are handled in a single spot.
  - config all calls, base url control, credential control, get put post calls handled consistently.
  - show user a loading spinner, handle preloader logic, track async calls.
  - handle errors in a standardized way.
  - single seam for mocking an api, by simply changing one line of code.
- HTML code should be written in the .html file.  Dynamic code should only follow a templated element in the html file and never created from scratch without following elements tags from the template.
