var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var shift_attendance_detailSchema = new mongoose.Schema({  
site_id : {  
       type: Schema.Types.ObjectId,
       ref: 'site_detail',
      },
submitted_by : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },
shift_type  : String,
overall_strgth  : Number,
present_strgth  : Number,
absent_strgth  : Number,
date  : String,
month_date : String,
over_data  : Array,
over_count : Array,
submitted_status : String
});
mongoose.model('shift_attendance_detail', shift_attendance_detailSchema);
shift_attendance_detailSchema.plugin(timestamps);
module.exports = mongoose.model('shift_attendance_detail');
