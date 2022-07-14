var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 


var attendance_detailSchema = new mongoose.Schema({  
site_id :  {  
       type: Schema.Types.ObjectId,
       ref: 'site_detail',
      },
emp_id : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },
shift_type : String,
scanned_by : String,
date_of_scan : String,
remarks : String,
status : String,
date : String,
month_date : String,
work_status : String,
});

attendance_detailSchema.plugin(timestamps);
mongoose.model('attendance_detail', attendance_detailSchema);
module.exports = mongoose.model('attendance_detail');
