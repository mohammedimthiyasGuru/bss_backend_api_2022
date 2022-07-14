var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 

var allocation_requestSchema = new mongoose.Schema({  


  current_site_id : {  
       type: Schema.Types.ObjectId,
       ref: 'site_detail',
      },
  employee_id : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },
  allocated_site_id : {  
       type: Schema.Types.ObjectId,
       ref: 'site_detail',
      },
  requested_by : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },
  requested_date : String,
  approval_by : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },

  approval_date : String,
  approval_status : String,
});

allocation_requestSchema.plugin(timestamps);
mongoose.model('allocation_request', allocation_requestSchema);

module.exports = mongoose.model('allocation_request');
