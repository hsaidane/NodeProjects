'use strict';
// controller does not know the database exists
// The model is aware of database.
// Share client with ...who neede it.
var redis     = require('../lib/redis');
var broadcast = require('../lib/broadcast');
/*
* Save badges to database
* @param {Array} badges
* @param {Function} Callback
*/
exports.save = function(badges, callback) {
   if (!badges.length) return callback(null,null);
   var badge = badges.pop();
   redis.lpush('badges', JSON.stringify(badge), function(err) {
       if (err) return callback(err,null);
       // Recursive- call  to go through all the badges..
       exports.save(badges, callback);
   });
};

/*
*  Trim down the redis list
*/
exports.trim = function() {
   redis.ltrim('badges', 0, 9);
};

/*
* Send  out badges to the broadcaster
* @param {Array} badges
* @param {Function} Callback
*/
exports.send = function(badges, callback) {
   if (badges.length)  {
     badges.forEach(broadcast.send); // for eah badge element invoke 'broadcast.send' method.
   } 
   // Same as:
   /*badges.forEach(function(badge) {
      broadcast.send(badge);
   });*/
   callback(null);
};

/*
*  Get badges (n element) from redis
*  @param {Function} callback
*/
exports.get = function(callback) {
   redis.lrange('badges', 0,-1, function(err,data) {
      if (err) return callback(err,null);
      //data = data.map(JSON.parse);
      callback(null, data.map(JSON.parse));
   });
};
//
