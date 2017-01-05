'use strict';
//
//   app[save] --> controllers[save] --> models[save]
// Badges are stored on redis/cache/memory
// Model gets the badges..
//
/*
* To test adding badges with redis.
* 1)  curl -X POST http://localhost:8080 -H "Content-Type:application/json" -d "[{\"badge_id\": \"badgeHs1\"}]"
* 2) run 1 a couple of times to add more badges.., then
* 3) curl http://localhost:8080/badges  // check redis data... calls  badges.get
*/

// For the 2'd test we need to create a new repo which will serve as
// a new end point to get the n badges (Use socket - port number).
var express = require('express');
var app =  express();
var badges = require('./controllers/badges');
//
// use a middleware, so every request goes through middleware prior
// to getting to the node..
app.use(express.json());

// Send publish
app.post('/', badges.save, badges.send);

app.get('/badges', badges.get);

app.listen(8080, function() {
   console.log('Listening on port 8080...');
});
// Testing
// a. node app
// b. curl -i -X POST http://localhost:8080
