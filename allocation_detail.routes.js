var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var allocation_detailModel = require('./../models/allocation_detailModel');
var request = require("request");

router.post('/create', async function(req, res) {
  try{
        await allocation_detailModel.create({
            
  site_id:  req.body.site_id,
  emp_id : req.body.emp_id,
  created_by : req.body.created_by,
  allocated_date : req.body.allocated_date, 
  shift_type :  req.body.shift_type,
  tranfer_date : ''
  tranfer_status : ''
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
      allocation_detailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"allocation_detailModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        allocation_detailModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});



router.post('/check_site_details', function (req, res) {
        allocation_detailModel.findOne({emp_id : req.body.emp_id}, function (err, StateList) {
           if(StateList == null){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : {} ,Code:404});
           }else{
           res.json({Status:"Success",Message:"SITE DETAIL", Data : StateList ,Code:200}); 
           }              
        }).populate('site_id');
});


router.post('/total_strength_fetch', function (req, res) {
        allocation_detailModel.find({site_id : req.body.site_id}, function (err, StateList) {
           if(StateList == null){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
           }else {
             var temp_data = [];
             for(let a = 0 ; a < StateList.length; a++){
                if(StateList[a].emp_id.user_designation !== 'ASO' && StateList[a].emp_id.user_designation !== 'Field Officer'){
                   temp_data.push(StateList[a]);
                }
                if(a == StateList.length - 1){
                    console.log(temp_data);
                    res.json({Status:"Success",Message:"SITE DETAIL", Data : temp_data ,Code:200});  
                }
             }
           }              
        }).populate('emp_id');
});



router.post('/total_strength_fetch_all', function (req, res) {
        allocation_detailModel.find({site_id : req.body.site_id}, function (err, StateList) {
           if(StateList == null){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
           }else {
            res.json({Status:"Success",Message:"SITE DETAIL", Data : StateList ,Code:200});
           }              
        }).populate('emp_id');
});




router.post('/fetch_allocation_shiftwise', function (req, res) {
        allocation_detailModel.find({site_id:req.body.site_id,shift_type:req.body.shift_type}, function (err, StateList) {
           if(StateList == null){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
           }else {
            for(let a = 0 ; a < StateList.length ; a ++){
            console.log(StateList[a]);
             var params =  {
            site_id : req.body.site_id,
            emp_id : StateList[a].emp_id._id,
            shift_type : req.body.shift_type,
            date : req.body.date,
            submitted_by : req.body.submitted_by
             }
            request.post(
                'http://3.101.19.51:3000/api/attendance/check_present_status_two',
                { json: params },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                       // res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
                    }
                }
            );
            if(a == StateList.length - 1){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
            }
            }
            
           }              
        }).populate('emp_id');
});


router.post('/total_strength_fetch_shift', function (req, res) {
        allocation_detailModel.find({site_id : req.body.site_id,shift_type:req.body.shift_type}, function (err, StateList) {
           if(StateList.length == 0){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
           }else {
             var temp_data = [];
             for(let a = 0 ; a < StateList.length; a++){
                if(StateList[a].emp_id.user_designation !== 'ASO' && StateList[a].emp_id.user_designation !== 'Field Officer'){
                   temp_data.push(StateList[a]);
                }
                if(a == StateList.length - 1){
                    console.log(temp_data);
                    res.json({Status:"Success",Message:"SITE DETAIL", Data : temp_data ,Code:200});  
                }
             }
           }              
        }).populate('emp_id');
});


router.post('/total_strength_fetch_shift_two', function (req, res) {
    console.log(req.body);
        allocation_detailModel.find({site_id:req.body.site_id,shift_type:req.body.shift_type}, function (err, StateList) {
            console.log(StateList);
           if(StateList.length == 0){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
           }else {
             var temp_data = [];
             for(let a = 0 ; a < StateList.length; a++){
                temp_data.push(StateList[a]);
                if(a == StateList.length - 1){
                    console.log(temp_data);
                    res.json({Status:"Success",Message:"SITE DETAIL", Data : temp_data ,Code:200});  
                }
             }
           }              
        });
});



router.post('/get_site_security_list_fetch', function (req, res) {
        allocation_detailModel.find({site_id:req.body.site_id}, function (err, StateList) {
           if(StateList == null){
              res.json({Status:"Failed",Message:"NO SITE FOUND", Data : [] ,Code:404});
           } else {
           res.json({Status:"Success",Message:"SITE DETAIL", Data : StateList ,Code:200}); 
           }              
        }).populate('emp_id');
});


router.post('/getlist_by_shift', function (req, res) {
        allocation_detailModel.find({site_id:  req.body.site_id,shift_type :  req.body.shift_type}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});



router.post('/getlist_by_site_id', function (req, res) {
        allocation_detailModel.find({site_id:  req.body.site_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});

router.post('/fetch_fo_site_list', function (req, res) {
        allocation_detailModel.find({emp_id : req.body.emp_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        }).populate('site_id emp_id');
});




router.get('/update_params',async function (req, res) {
        site_detailModel.find({},async function (err, Functiondetails) {
          for(let a = 0; a < Functiondetails.length; a++){
           site_detailModel.findByIdAndUpdate(Functiondetails[a]._id,{tranfer_date : '',tranfer_status : ''}, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
            });
           if(a == Functiondetails.length - 1 ){
            res.json({Status:"Success",Message:"Functiondetails Updated", Data : {} ,Code:200});
           }
          }
        }).sort({_id:-1});
});



  



router.get('/getlist', function (req, res) {
        allocation_detailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        });
});


router.post('/edit', function (req, res) {
        allocation_detailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      allocation_detailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
