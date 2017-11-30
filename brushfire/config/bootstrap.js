/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  Video.count().exec(function(err, numVideos) {
    if(err) {
      return cb(err);
    }
    if(numVideos > 0) {
      console.log('Number of videos: ', numVideos);
      return cb();
    }

    var Youtube = require('machinepack-youtube');
    var env = require('./local.js');

    Youtube.searchVideos({
      query: 'grumpy cat',
      apiKey: env.google.apiKey,
      limit: 15
    }).exec({
      error: function (err) {
        console.log('An error: ', err);
        return cb(err);
      },
      success: function(result) {
        // got the results then map it to our data model.
        _.each(result, function(video) {
          video.src = 'https://www.youtube.com/embed/' + video.id;
          delete video.description;
          delete video.publishedAt;
          delete video.id;
          delete video.url;
        });

        Video.create(result).exec(function(err, videoCreated) {
          if(err) {
            return cb(err);
          }
          console.log(videoCreated);
          return cb();
        });
      }
    });
  });
};
