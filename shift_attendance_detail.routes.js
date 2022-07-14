var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var shift_attendance_detailModel = require('./../models/shift_attendance_detailModel');
var request = require("request");

router.post('/create', async function(req, res) {
var shift_data = await shift_attendance_detailModel.findOne({site_id :req.body.site_id,shift_type:req.body.shift_type,date:req.body.date});
if(shift_data == null){
  try{
        await shift_attendance_detailModel.create({
site_id :req.body.site_id,
submitted_by : req.body.submitted_by,
shift_type  : req.body.shift_type,
overall_strgth  : req.body.overall_strgth,
present_strgth  : req.body.present_strgth,
absent_strgth  :req.body.absent_strgth,
date  : req.body.date,
month_date : req.body.date.slice(0, -3),
over_data  : req.body.over_data,
submitted_status : req.body.submitted_status,
over_count : req.body.over_data || [],
        }, 
        function (err, user) {
          console.log(user)
          if(req.body.submitted_status == 'SUBMITTED'){
            var params =  {
             site_id: req.body.site_id,
             shift_type : req.body.shift_type,
             date  : req.body.date,
             month_date : req.body.date.slice(0, -2),
             submitted_by : req.body.submitted_by
             }
            request.post(
                'http://3.101.19.51:3000/api/allocation_detail/fetch_allocation_shiftwise',
                { json: params },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                       res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
                    }
                }
            );
          }else{
            res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
          }

        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}
else {
 shift_attendance_detailModel.findByIdAndUpdate(shift_data._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
            if(req.body.submitted_status == 'SUBMITTED'){
            var params =  {
             site_id: req.body.site_id,
             shift_type : req.body.shift_type,
             date  : req.body.date,
             month_date : req.body.date.slice(0, -2),
             submitted_by : req.body.submitted_by
             }
            request.post(
                'http://3.101.19.51:3000/api/allocation_detail/fetch_allocation_shiftwise',
                { json: params },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                       res.json({Status:"Success",Message:"Added successfully", Data : UpdatedDetails ,Code:200}); 
                    }
                }
            );
          }else{
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
          }
  });
}
});


router.get('/deletes', function (req, res) {
      shift_attendance_detailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"shift_attendance_detailModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/check_submit_status', function (req, res) {
        shift_attendance_detailModel.findOne({
            site_id :req.body.site_id,
            shift_type : req.body.shift_type,
            date : req.body.date
        }, function (err, StateList) {
          if(StateList == null){
                res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }else{
             res.json({Status:"Success",Message:"Already Data Submitted", Data : StateList ,Code:200});
          }
        });
});



router.post('/list_month_wise_detail', function (req, res) {
        shift_attendance_detailModel.find({
            site_id :req.body.site_id,
            month_date : req.body.month_date
        }, function (err, StateList) {
          if(StateList == null){
                res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }else{
             res.json({Status:"Success",Message:"Already Data Submitted", Data : StateList ,Code:200});
          }
        });
});


router.post('/list_daily_wise_detail', function (req, res) {
        shift_attendance_detailModel.find({
            site_id :req.body.site_id,
            date  : req.body.date,
        }, function (err, StateList) {
          if(StateList == null){
                res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }else{
             res.json({Status:"Success",Message:"Already Data Submitted", Data : StateList ,Code:200});
          }
        });
});





router.get('/getlist', function (req, res) {
        shift_attendance_detailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        }).populate('site_id');
});


router.post('/edit', function (req, res) {
        shift_attendance_detailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      shift_attendance_detailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
