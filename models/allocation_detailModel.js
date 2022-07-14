var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var allocation_detailSchema = new mongoose.Schema({  

  site_id:  {  
       type: Schema.Types.ObjectId,
       ref: 'site_detail',
      },
  emp_id : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },
  created_by : String,
  allocated_date : String,
  shift_type :  String,

  tranfer_date : String,
  tranfer_status : String,

  

});
mongoose.model('allocation_detail', allocation_detailSchema);
allocation_detailSchema.plugin(timestamps);
module.exports = mongoose.model('allocation_detail');
