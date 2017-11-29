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