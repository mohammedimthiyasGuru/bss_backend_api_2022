var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var employee_detailSchema = new mongoose.Schema({  

  bss_no :  String,
  name :  String,
  user_designation :  String,
  posting_date  :  String,
  address :  String,
  mobile :  String,
  email_id :  String,
  login_id :  String,
  password :  String,
  site_id :  {  
       type: Schema.Types.ObjectId,
       ref: 'site_detail',
      },
  shift_type :  String,


});

employee_detailSchema.plugin(timestamps);
mongoose.model('employee_detail', employee_detailSchema);
module.exports = mongoose.model('employee_detail');
