# Sails.js

This repository is about learning Sails.js

First of all, Sails.js helps you build web applications very rapidly. It is based on the principles of ruby on rails and help in Rapid prototyping.

So, let's get started! 

First thing first! You will need Node.js and npm (node package manager).

Install Sails.js globally.

`npm install sails -g`

To generate new application, just type 

`sails new <app-name>`

It will scaffold out an application for you. Go to generated application using `cd` command.

To test run your application, just use `sails lift` and open [http://localhost:1337](http://localhost:1337)

The default home page is configured at generated application `/config/routes.js file`.

The views are available in `views` directory.

Convert root route to `index.html`. You can use `sails-generate-static` to convert `homepage.ejs` to `index.html`.

Use: `npm install sails-generate-static --save`

Then, run `sails generate static`. This automatically removes explicit route in `config/routes.js` and copies most of the content to `assets/index.html`. Now, `assets` directory works as static file resource. So, sails will look for route for '/' and when it doesn't find one, it will go to `assets` and serve the `index.html` file.

Sails uses Grunt to build files and copies all the assets to `.tmp/public` directory. So, it serves these files ultimately. You can read more about [assets pipelining](https://sailsjs.com/documentation/concepts/assets/default-tasks#?overview).

We can also change the configuration for automatically adding CSS and JS files from Grunt task configuration in `tasks/pipeline.js` file.

Sails-linter automatically adds css files from `assets/styles` into html files. This happens automatically. It loads them inside <!--STYLES --> comment. It does similar automatic linking for JS files. These files are imported based on their name.

### Generating blueprint apis

You can generate different api end points using 
`sails generate api video`

Sails uses localStorageDb to store the blueprint api data. These are stored in memory in `.tmp` folder.

This process creates `controllers/VideoController.js` and `models/Video.js` model in `api` directory. These are empty at the moment. This also exposes various default routes for CRUD operations.

/video/find     - find all videos
/video/find/:id     - find a video with given id
/video/create       - create video given as query param
/video/update/:id       - update a video with given id
/video/destroy/:id      - delete a video with given id

All these routes are GET method routes so that they can be tested using browser.

You can create a video using:

`http://localhost:1337/video/create?title=hi&album=hello&name=Piyush`

Get a list of videos using :

`http://localhost:1337/video/find`

- Sails.js takes care of creating unique id for various types of Databases. It also adds createdAt and updatedAt fields.

Working with $http service of AngularJS is fine, but Sails provides even more real-time service socket.io. This updates the page even when some other user adds a videos. It is like a subscription to the page that will be updated real-time.

When we use `return` in the callback stack, it returns the control back to the Sails.js. Socket.io provides similar functions like get, post, put, delete. However, it takes callback function.

### Boostrapping Your app

You can use `config/bootstrap.js` to bootstrap the code on the first run. For example, to load initial data that will invite new users. It works in sequence:

1. Loads models and adapters
2. Run bootstrap.js file.
3. continue lifting sails

We can use configuration variables in `config/local.js` and this file is in the `.gitignore` so it will not be hosted on Github if your project is public.