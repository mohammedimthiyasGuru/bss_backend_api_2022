var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema; 


var site_detailSchema = new mongoose.Schema({  
unit_Id :  String,
unit_password :  String,
unit_code :  String,
unit_name :  String,
unit_area :  String,
unit_address :  String,
unit_type :  String,
unit_created :  String,
unit_no_of_shift :  Number,
unit_shift_one_start :  String,
unit_shift_one_end :  String,
unit_shift_two_start :  String,
unit_shift_two_end :  String,
unit_shift_three_start :  String,
unit_shift_three_end :  String,
unit_shift_gen_start : String,
unit_shift_gen_end : String,
unit_genr_shift_status : Boolean,
unit_one_shift_status : Boolean,
unit_two_shift_status : Boolean,
unit_three_shift_status : Boolean,



unit_total_count : Number,
unit_total_count_data : Array,
unit_general_total_count : Number,
unit_general_total_count_data : Array,
unit_shiftone_total_count : Number,
unit_shiftone_total_count_data : Array,
unit_shifttwo_total_count : Number,
unit_shifttwo_total_count_data : Array,
unit_shiftthree_total_count : Number,
unit_shiftthree_total_count_data : Array,


start_date : String,
end_date : String,

fo_id : {  
       type: Schema.Types.ObjectId,
       ref: 'employee_detail',
      },


delete_date : String,
deleted_by : String,
delete_status : Boolean





});

site_detailSchema.plugin(timestamps);
mongoose.model('site_detail', site_detailSchema);
module.exports = mongoose.model('site_detail');
