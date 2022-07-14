var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var service_user_management = require('./../models/service_userdetailsModel');


router.post('/create', async function(req, res) {

  var user_detail  =  await service_user_management.findOne({user_mobile_no: req.body.user_mobile_no});
  console.log(user_detail);

  if(user_detail == null){
  try{
        await service_user_management.create({  
  user_mobile_no: req.body.user_mobile_no || "",
  user_password : req.body.user_password || "",
  user_per_mob : req.body.user_per_mob || "",
  user_name : req.body.user_name || "",
  user_email : req.body.user_email || "",
  user_introduced_by : req.body.user_introduced_by || "",
  user_location : req.body.user_location || "",
  user_mob_model : req.body.user_mob_model || "",
  user_mob_os : req.body.user_mob_os || "",
  user_mob_make : req.body.user_mob_make || "",
  device_no : req.body.device_no || "",
  organisation_name : req.body.organisation_name || "",
  status : req.body.status || "",
  mobile_issue_date : req.body.mobile_issue_date || "",
  Documents : req.body.Documents || "",
  delete_status : false,
  last_login_time : "",
  last_logout_time:  "",
  user_token : "",
        }, 
        function (err, user) {
          console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
}else {
    res.json({Status:"Failed",Message:"Mobile Number Already Exist", Data : {} ,Code:201}); 
}
});


router.get('/deletes', function (req, res) {
      service_user_management.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"User management Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        service_user_management.find({user_id:req.body.user_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"User management List", Data : StateList ,Code:200});
        });
});



router.post('/info', function (req, res) {
        service_user_management.findOne({user_mobile_no:req.body.user_mobile_no}, function (err, StateList) {
          res.json({Status:"Success",Message:"User Management Details", Data : StateList ,Code:200});
        });
});


router.get('/logout_reason', function (req, res) {
         var StateList = [
             {
                logout_reason:"LEAVE"
             },
             {
                logout_reason:"DAY OUT"
             },
             {
                logout_reason:"PERMISSION"
             },
             {
                logout_reason:"OFFICE / TRAINING"
             },
             {
                logout_reason:"STANDBY"
             }
         ];
        res.json({Status:"Success",Message:"LOGOUT REASON", Data : StateList ,Code:200});
});





router.post('/mobile/login_page', function (req, res) {
        service_user_management.findOne({user_mobile_no:req.body.user_mobile_no,user_password:req.body.user_password}, function (err, StateList) {
            if(StateList == null){
              res.json({Status:"Failed",Message:"Account not found", Data : {} ,Code:404});
            }else{
              res.json({Status:"Success",Message:"User Details", Data : StateList ,Code:200});
            }          
        });
});


router.get('/reload_data2',async function (req, res) {
        var ref_code_details  =  await service_user_management.find({}).sort({index:1});
        for(let a  = 0; a < ref_code_details.length ; a ++){
         let d = {
            user_role : "USER",
         }
         service_user_management.findByIdAndUpdate(ref_code_details[a]._id, d, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
        });
         if(a == ref_code_details.length - 1){
            res.json({Status:"Success",Message:"group_detailModel Updated", Data : {} ,Code:200});
         }
        }

});


router.post('/admin_delete', function (req, res) {
      service_user_management.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User management Deleted successfully", Data : {} ,Code:200});
      });
});



router.post('/mainmenu_counts', function (req, res) {
        let a  = {
            services_count : 4,
            view_status : 1
        }
       res.json({Status:"Success",Message:"Main Menu Counts", Data : a ,Code:200});
});



router.post('/job_status_count', function (req, res) {
        let a  = {
            paused_count : 4
        }
       res.json({Status:"Success",Message:"Job status count", Data : a ,Code:200});
});



router.post('/service_list', function (req, res) {
        let a  = [
               {
                service_name : 'Breakdown Serivce',
                last_used_time : '23-10-2022 16:06',
                uploaded_count : 1,
                pending_count : 0,
                failur_count : 0,
                paused_count : 0,
                job_count : 0,
               },
               {
                service_name : 'LR SERVICE',
                last_used_time : '23-10-2022 16:06',
                uploaded_count : 2,
                pending_count : 1,
                failur_count : 3,
                paused_count : 4,
                job_count : 5,
               },
               {
                service_name : 'Preventive Maintenance',
                last_used_time : '23-10-2022 16:06',
                uploaded_count : 1,
                pending_count : 0,
                failur_count : 0,
                paused_count : 0,
                job_count : 0,
               },
               {
                service_name : 'Parts Replacement ACK',
                last_used_time : '23-10-2022 16:06',
                uploaded_count : 1,
                pending_count : 0,
                failur_count : 0,
                paused_count : 0,
                job_count : 0,
               }
        ]        
       res.json({Status:"Success",Message:"Service List", Data : a ,Code:200});
});



router.post('/view_status', function (req, res) {
        let a  = [
               {

                status_title : "Pending Job",
                count : 1,
                service_list : [
                    {
                        service_name : 'Breakdown Serivce',
                        count : 0
                    },
                    {
                        service_name : 'LR SERVICE',
                        count : 0
                    },
                    {
                        service_name : 'Preventive Maintenance',
                        count : 0
                    },
                    {
                        service_name : 'Parts Replacement ACK',
                        count : 0
                    }
                ] 
               },
               {
                status_title : "Completed Job",
                count : 1,
                service_list : [
                    {
                        service_name : 'Breakdown Serivce',
                        count : 0
                    },
                    {
                        service_name : 'LR SERVICE',
                        count : 0
                    },
                    {
                        service_name : 'Preventive Maintenance',
                        count : 0
                    },
                    {
                        service_name : 'Parts Replacement ACK',
                        count : 0
                    }
                ] 
               },
               {
                status_title : "Error Job",
                count : 1,
                service_list : [
                    {
                        service_name : 'Breakdown Serivce',
                        count : 0
                    },
                    {
                        service_name : 'LR SERVICE',
                        count : 0
                    },
                    {
                        service_name : 'Preventive Maintenance',
                        count : 0
                    },
                    {
                        service_name : 'Parts Replacement ACK',
                        count : 0
                    }
                ] 
               }

        ]        
       res.json({Status:"Success",Message:"Service List", Data : a ,Code:200});
});



router.get('/getlist', function (req, res) {
        service_user_management.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"User management", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        service_user_management.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"User management Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      service_user_management.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"User management Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
