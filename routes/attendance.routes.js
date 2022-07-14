var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var attendanceModel = require('./../models/attendanceModel');


router.post('/create', async function(req, res) {
  try{
await attendanceModel.create({
site_id : req.body.site_id,
emp_id : req.body.emp_id,
shift_type : req.body.shift_type,
scanned_by : req.body.scanned_by,
date_of_scan : req.body.date_of_scan,
remarks : req.body.remarks,
status : req.body.status,
date : req.body.date,
month_date : req.body.date.slice(0, -3),
work_status : 'P'
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
});


router.get('/deletes', function (req, res) {
      attendanceModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"attendanceModel Deleted", Data : {} ,Code:200});     
      });
});




router.post('/create2', async function(req, res) {
   var attendance_detail = await attendanceModel.findOne({site_id : req.body.site_id,
emp_id : req.body.emp_id,
shift_type : req.body.shift_type,
date : req.body.date,
month_date : req.body.date.slice(0, -3),
work_status : 'P'
});
if(attendance_detail == null){
      try{
await attendanceModel.create({
site_id : req.body.site_id,
emp_id : req.body.emp_id,
shift_type : req.body.shift_type,
scanned_by : req.body.scanned_by,
date_of_scan : req.body.date_of_scan,
remarks : req.body.remarks,
status : req.body.status,
date : req.body.date,
month_date : req.body.date.slice(0, -3),
work_status : 'P'
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}

} else {
     attendanceModel.findByIdAndUpdate(attendance_detail._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
     });
   }

});






router.post('/getlist_id', function (req, res) {
        attendanceModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});




router.post('/fetch_attendance_report_empi_site', function (req, res) {
        attendanceModel.find({
            site_id : req.body.site_id,
            emp_id : req.body.emp_id,
            month_date : req.body.month_date
        }, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});







router.post('/check_present_status',async function (req, res) {
        console.log(req.body);
        attendanceModel.findOne({date:req.body.date,emp_id:req.body.emp_id,shift_type : req.body.shift_type,site_id : req.body.site_id}, function (err, StateList) {
if(StateList == null){
attendanceModel.create({
site_id : req.body.site_id,
emp_id : req.body.emp_id,
shift_type : req.body.shift_type,
scanned_by : req.body.scanned_by,
date_of_scan : req.body.date_of_scan,
remarks : req.body.remarks,
status : req.body.status,
date : req.body.date,
work_status : 'P',
month_date : req.body.date.slice(0, -3),
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
              // res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }  
          else{
             res.json({Status:"Success",Message:"Present", Data : StateList ,Code:401});
          }
        });
});




router.post('/check_present_status_two',async function (req, res) {
        // console.log(req.body);
        attendanceModel.findOne({date:req.body.date,emp_id:req.body.emp_id,shift_type : req.body.shift_type,site_id : req.body.site_id}, function (err, StateList) {
if(StateList == null){
attendanceModel.create({
site_id : req.body.site_id,
emp_id : req.body.emp_id,
shift_type : req.body.shift_type,
scanned_by : req.body.submitted_by,
date_of_scan : 'Auto ',
remarks : 'Auto Absent',
status : '',
date : req.body.date,
month_date : req.body.date.slice(0, -3),
work_status : 'A'
        }, 
        function (err, user) {
          // console.log(user)
        // res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
              // res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }  
          else{
             // res.json({Status:"Success",Message:"Present", Data : StateList ,Code:401});
          }
        });
});

router.post('/check_present', function (req, res) {
        attendanceModel.findOne({date : req.body.date,emp_id:req.body.emp_id,work_status:'P'}, function (err, StateList) {
          if(StateList == null){
              res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }  
          else{
             res.json({Status:"Success",Message:"Present", Data : StateList ,Code:200});
          }
        });
});






router.post('/fetch_attendance_report_unitwise', function (req, res) {
        attendanceModel.find({month_date : req.body.month_date,site_id:req.body.site_id}, function (err, StateList) {
          if(StateList == null){
              res.json({Status:"Failed",Message:"No Record Found", Data : {} ,Code:404});
          }  
          else{
             res.json({Status:"Success",Message:"Present", Data : StateList ,Code:200});
          }
        }).populate('emp_id');
});




router.post('/fetch_attendance_overview', function (req, res) {
        attendanceModel.find({date:req.body.date,site_id:req.body.site_id,shift_type:req.body.shift_type}, function (err, StateList) {
           res.json({Status:"Success",Message:"Present", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});



router.post('/fetch_attendance_overview_site', function (req, res) {
        attendanceModel.find({date:req.body.date,site_id : req.body.site_id}, function (err, StateList) {
           res.json({Status:"Success",Message:"Present", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});


router.post('/fetch_single_emp_attendance_list', function (req, res) {
        attendanceModel.find({emp_id:req.body.emp_id}, function (err, StateList) {
           res.json({Status:"Success",Message:"Present", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});


router.post('/fetch_attendance_overview_site_one', function (req, res) {
        attendanceModel.find({date:req.body.date,site_id : req.body.site_id}, function (err, StateList) {

            if(StateList == null){
              res.json({Status:"Failed",Message:"NO DETAIL FOUND", Data : [] ,Code:404});
           }else {
             var temp_data = [];
             for(let a = 0 ; a < StateList.length; a++){
                if(StateList[a].emp_id.user_designation !== 'ASO' && StateList[a].emp_id.user_designation !== 'Field Officer'){
                   temp_data.push(StateList[a]);
                }
                if(a == StateList.length - 1){
                    console.log(temp_data);
                    res.json({Status:"Success",Message:"PRESENT DETAIL", Data : temp_data ,Code:200});  
                }
             }
           }  
           // res.json({Status:"Success",Message:"Present", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});



router.get('/getlist', function (req, res) {
        attendanceModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        }).populate('site_id emp_id');
});


router.post('/edit', function (req, res) {
        attendanceModel.findByIdAndUpdate(req.body.Activity_id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      attendanceModel.findByIdAndRemove(req.body.Activity_id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
