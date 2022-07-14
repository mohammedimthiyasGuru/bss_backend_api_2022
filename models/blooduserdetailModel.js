var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var blooduserdetailSchema = new mongoose.Schema({  
  phone_number :  String,
  password :  String,
});

blooduserdetailSchema.plugin(timestamps);
mongoose.model('blooduserdetail', blooduserdetailSchema);
module.exports = mongoose.model('blooduserdetail');
