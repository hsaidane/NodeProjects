'user strict';
//  Redis: Check gihub for redis documentation...


// Pusrpose of LIb/redis.js: Create a new driver and intiate a new connection.
var redis = require('redis');
var client = redis.createClient();

client.on('error',function(err) {
  throw err;
});

module.exports = client;  // make it available  to other modules.
