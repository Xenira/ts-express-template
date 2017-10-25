var mongoose = require( 'mongoose' );
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;
var exampleSchema = new Schema({
    name: String,
    token: String,
});

exampleSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    token: this.token,
    name: this.name,
    exp: expiry.getTime() / 1000,
  }, "MY_SECRET"); // TODO: DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('Example', exampleSchema);
