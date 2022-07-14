var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var blooddetailModel = require('./../models/blooddetailModel');


router.post('/create', async function(req, res) {
  try{
        await blooddetailModel.create({
  user_id : req.body.user_id,
  phone_number : req.body.phone_number,
  name :  req.body.name,
  location : req.body.location,
  bloodgroup : req.body.bloodgroup,
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
      blooddetailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"blooddetailModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        blooddetailModel.findOne({user_id:req.body._id}, function (err, StateList) {
            if(StateList == null){
                res.json({Status:"Failed",Message:"No Record", Data : {} ,Code:404});
            }else{
             res.json({Status:"Success",Message:"Data Found", Data : StateList ,Code:200});   
            }
          
        });
});


router.post('/getlist_group', function (req, res) {
        blooddetailModel.find({bloodgroup : req.body.bloodgroup,}, function (err, StateList) {
            res.json({Status:"Success",Message:"Data Found", Data : StateList ,Code:200});   
        });
});


router.post('/login', function (req, res) {
        blooddetailModel.findOne({phone_number:req.body.phone_number,
  password :  req.body.password}, function (err, StateList) {
     if(StateList == null){
         res.json({Status:"Failed",Message:"Account Not Found", Data : {} ,Code:404});
     }else{
        res.json({Status:"Success",Message:"Login Successfully", Data : StateList ,Code:200});
     }
        });
});


router.get('/employee_type', function (req, res) {
        let data = [
{status : 'AM'},
{status : 'AO'},
{status : 'UI'},
{status : 'SI'},
{status : 'SO'},
{status : 'ASO'},
{status : 'LSS'},
{status : 'SS'},
{status : 'HG'},
{status : 'EG'},
{status : 'SG'},
{status : 'LSG'},
{status : 'FS'},
{status : 'FG'},
{status : 'TM'},
{status : 'BM'},
{status : 'SD'},
{status : 'DRV'},
{status : 'HK'},
{status : 'HK SUP'},
{status : 'VD'},
{status : 'CCTV OPR'},
{status : 'RECP'},
{status : 'FE'},
{status : 'GMAN'},
{status : 'Field Officer'},
{status : 'ASO'},
{status : 'OTHERS'},
        ];
        res.json({Status:"Success",Message:"Functiondetails", Data : data ,Code:200});

});




router.get('/getlist', function (req, res) {
        blooddetailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        }).sort({_id:-1});
});


router.post('/edit', function (req, res) {
        blooddetailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      blooddetailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
