var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var blooddetailSchema = new mongoose.Schema({  
  phone_number :  String,
  user_id : String,
  name :  String,
  location : String,
  bloodgroup : String,
});

blooddetailSchema.plugin(timestamps);
mongoose.model('blooddetail', blooddetailSchema);
module.exports = mongoose.model('blooddetail');
