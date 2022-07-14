var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var allocation_requestModel = require('./../models/allocation_requestModel');


router.post('/create', async function(req, res) {
  try{
        await allocation_requestModel.create({
  current_site_id : req.body.current_site_id,
  employee_id : req.body.employee_id,
  allocated_site_id : req.body.allocated_site_id,
  requested_by : req.body.requested_by,
  requested_date : req.body.requested_date,
  approval_by : req.body.approval_by,
  approval_date : '',
  approval_status : req.body.approval_status,
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
      allocation_requestModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"allocation_requestModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        allocation_requestModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});



router.post('/list_request_allocation', function (req, res) {
        allocation_requestModel.find({requested_by:req.body.requested_by}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        }).populate('current_site_id employee_id allocated_site_id');
});



router.get('/getlist', function (req, res) {
        allocation_requestModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        }).populate('current_site_id employee_id allocated_site_id requested_by approval_by');
});


router.post('/edit', function (req, res) {
        allocation_requestModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      allocation_requestModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
