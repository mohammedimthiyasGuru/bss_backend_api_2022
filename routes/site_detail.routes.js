var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var site_detailModel = require('./../models/site_detailModel');


router.post('/create', async function(req, res) {
    console.log(req.body);

var attendance_detail = await site_detailModel.findOne({bss_no:req.body.bss_no});
  if(attendance_detail == null){

  try{
        await site_detailModel.create({      
unit_Id :  req.body.unit_Id || '',
unit_password :  req.body.unit_password || '',
unit_code :  req.body.unit_code || '',
unit_name :  req.body.unit_name || '',
unit_area :  req.body.unit_area || '',
unit_address :  req.body.unit_address || '',
unit_type :  req.body.unit_type.status || '',
unit_created :  req.body.unit_created || '',
unit_no_of_shift :  req.body.unit_no_of_shift || 0,
unit_shift_one_start :  req.body.unit_shift_one_start || '',
unit_shift_one_end :  req.body.unit_shift_one_end || '',
unit_shift_two_start :  req.body.unit_shift_two_start || '',
unit_shift_two_end :  req.body.unit_shift_two_end || '',
unit_shift_three_start :  req.body.unit_shift_three_start || '',
unit_shift_three_end :  req.body.unit_shift_three_end || '',
unit_shift_gen_start : req.body.unit_shift_gen_start || '',
unit_shift_gen_end : req.body.unit_shift_gen_end || '',
unit_genr_shift_status : req.body.unit_genr_shift_status || false,
unit_one_shift_status : req.body.unit_one_shift_status || false,
unit_two_shift_status : req.body.unit_two_shift_status || false,
unit_three_shift_status : req.body.unit_three_shift_status || false,
unit_total_count : req.body.unit_total_count || 0,
unit_total_count_data : req.body.unit_total_count_data || [],
unit_general_total_count : req.body.unit_general_total_count || 0,
unit_general_total_count_data : req.body.unit_general_total_count_data || [],
unit_shiftone_total_count : req.body.unit_shiftone_total_count || 0,
unit_shiftone_total_count_data : req.body.unit_shiftone_total_count_data  || [],
unit_shifttwo_total_count : req.body.unit_shifttwo_total_count || 0,
unit_shifttwo_total_count_data : req.body.unit_shifttwo_total_count_data  || [],
unit_shiftthree_total_count : req.body.unit_shiftthree_total_count || 0,
unit_shiftthree_total_count_data : req.body.unit_shiftthree_total_count_data || [],
start_date : req.body.start_date || '',
end_date : req.body.end_date || '',
fo_id: req.body.fo_id,
delete_date : '',
deleted_by : '',
delete_status : true
        }, 
        function (err, user) {
          console.log(err)
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      console.log(e)
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}else{
     res.json({Status:"Failed",Message:"This site name already there", Data : {} ,Code:404}); 
}
});


router.get('/deletes', function (req, res) {
      site_detailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"site_detailModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        site_detailModel.findOne({_id:req.body.site_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});


router.get('/update_params',async function (req, res) {
        site_detailModel.find({},async function (err, Functiondetails) {
          for(let a = 0; a < Functiondetails.length; a++){
           site_detailModel.findByIdAndUpdate(Functiondetails[a]._id, {start_date : "",end_date :  ""}, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
            });
           if(a == Functiondetails.length - 1 ){
            res.json({Status:"Success",Message:"Functiondetails Updated", Data : {} ,Code:200});
           }
          }
        }).sort({_id:-1});
});



router.get('/getlist', function (req, res) {
        site_detailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        }).populate('fo_id');
});


router.get('/getlist_true', function (req, res) {
        site_detailModel.find({delete_status : true}, function (err, Functiondetails) {
          let final_data = [];
          for(let a = 0; a < Functiondetails.length; a++){
            console.log(Functiondetails[a]._id);
          if(""+Functiondetails[a]._id !== '62c52a776fb18d769dfc2288'){
            final_data.push(Functiondetails[a])
           }
           if(a == Functiondetails.length - 1 ){
            res.json({Status:"Success",Message:"Site List", Data : final_data ,Code:200});
           }
          }
        }).populate('fo_id');
});



router.post('/fetch_fo_over_site_list', function (req, res) {
        site_detailModel.find({delete_status : true,fo_id: req.body.fo_id}, function (err, Functiondetails) {
         let final_data = [];
          for(let a = 0; a < Functiondetails.length; a++){
            console.log(Functiondetails[a]._id);
          if(""+Functiondetails[a]._id !== '62c52a776fb18d769dfc2288'){
            final_data.push(Functiondetails[a])
           }
           if(a == Functiondetails.length - 1 ){
            res.json({Status:"Success",Message:"Site List", Data : final_data ,Code:200});
           }
          }
        }).populate('fo_id');
});



router.get('/getlist_false', function (req, res) {
        site_detailModel.find({delete_status : false}, function (err, Functiondetails) {
           let final_data = [];
          for(let a = 0; a < Functiondetails.length; a++){
            console.log(Functiondetails[a]._id);
          if(""+Functiondetails[a]._id !== '62c52a776fb18d769dfc2288'){
            final_data.push(Functiondetails[a])
           }
           if(a == Functiondetails.length - 1 ){
            res.json({Status:"Success",Message:"Site List", Data : final_data ,Code:200});
           }
          }
        }).populate('fo_id');
});


router.post('/edit', function (req, res) {
        site_detailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});



// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      site_detailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
