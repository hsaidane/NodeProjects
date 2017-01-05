'use strict';
// controller server as a middleware..
var _ = require('underscore');
var model = require('../models/badges');

/*
*  Send badges to model to be saved.
*/

exports.save = function(req, res, next) {
   // var badges = req.body;  // here you get a ref to object.
   var badges = _.clone(req.body); // deep copy - so object is preserved.
   model.save(badges, function(err) {
       if (err) return res.json(503, { error: true});
       next(); // continue - Tell express I"m done here...
       model.trim();  //
   });
};

/*
*  Send badges to pub/sub socket in model.
*/
exports.send = function(req, res, next) {
   var badges = _.clone(req.body);
   model.send(badges, function(err) {
   if (err) return res.json(503, { error: true});
      res.json(200, { error: null });  // When done send a jason response - no error.
   });
   next();
};

/*
*   Get 10 badges from model...
*/
exports.get = function(req,res) {
    model.get(function(err,data) {   // Get data From model
                                      // and send it to Json.
    if (err) return res.json(503, { error: true});
       // Data comming from the model are string, need to map to json
        res.json(200, data);
    });
};
