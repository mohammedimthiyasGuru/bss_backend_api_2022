var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var emp_typeSchema = new mongoose.Schema({
  emp_type :  String,
  created_by : String
});

emp_typeSchema.plugin(timestamps);
mongoose.model('emp_type', emp_typeSchema);
module.exports = mongoose.model('emp_type');
