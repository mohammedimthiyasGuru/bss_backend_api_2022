var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var employee_detailModel = require('./../models/employee_detailModel');


router.post('/create', async function(req, res) {
  var attendance_detail = await employee_detailModel.findOne({bss_no:req.body.bss_no});
  if(attendance_detail == null){
      try{
        await employee_detailModel.create({
  bss_no :  req.body.bss_no,
  name :  req.body.name,
  user_designation :  req.body.user_designation,
  posting_date  :  req.body.posting_date,
  address :  req.body.address,
  mobile :  req.body.mobile,
  email_id :  req.body.email_id,
  login_id :  req.body.login_id,
  password :  req.body.password,
  site_id : "62c52a776fb18d769dfc2288",
  shift_type :  req.body.shift_type || "",
        }, 
        function (err, user) {
        console.log(user)
        res.json({Status:"Success",Message:"Added successfully", Data : user ,Code:200}); 
        });
}
catch(e){
      res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
}
  }
  else{
    res.json({Status:"Failed",Message:"This bss no already exist", Data : {} ,Code:404}); 
  }
  

});


router.get('/deletes', function (req, res) {
      employee_detailModel.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"employee_detailModel Deleted", Data : {} ,Code:200});     
      });
});


router.post('/getlist_id', function (req, res) {
        employee_detailModel.find({Person_id:req.body.Person_id}, function (err, StateList) {
          res.json({Status:"Success",Message:"State List", Data : StateList ,Code:200});
        });
});


router.post('/login', function (req, res) {
        employee_detailModel.findOne({login_id:req.body.login_id,
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
{status : 'OTHERS'},
        ];
        res.json({Status:"Success",Message:"Functiondetails", Data : data ,Code:200});
});




router.get('/getlist', function (req, res) {
        employee_detailModel.find({}, function (err, Functiondetails) {
          res.json({Status:"Success",Message:"Functiondetails", Data : Functiondetails ,Code:200});
        }).sort({_id:-1}).populate('site_id');
});


router.get('/getlist_userdetail_without_allocation', function (req, res) {
        employee_detailModel.find({}, function (err, Functiondetails) {
        let final_data = [];
        for(let a  = 0; a < Functiondetails.length; a++){
              if(""+Functiondetails[a].site_id == '62c52a776fb18d769dfc2288'){
                final_data.push(Functiondetails[a])
              }
            if(a == Functiondetails.length - 1){
              res.json({Status:"Success",Message:"Functiondetails", Data : final_data ,Code:200});
            }
        }
        }).sort({_id:-1});
});






router.get('/update_params',async function (req, res) {
        employee_detailModel.find({},async function (err, Functiondetails) {
          for(let a = 0; a < Functiondetails.length; a++){
           employee_detailModel.findByIdAndUpdate(Functiondetails[a]._id, {site_id : "62c52a776fb18d769dfc2288",shift_type :  ""}, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500}); 
            });
           if(a == Functiondetails.length - 1 ){
            res.json({Status:"Success",Message:"Functiondetails Updated", Data : {} ,Code:200});
           }
          }
        }).sort({_id:-1});
});



router.post('/edit', function (req, res) {
        employee_detailModel.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, UpdatedDetails) {
            if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
             res.json({Status:"Success",Message:"Functiondetails Updated", Data : UpdatedDetails ,Code:200});
        });
});
// // DELETES A USER FROM THE DATABASE
router.post('/delete', function (req, res) {
      employee_detailModel.findByIdAndRemove(req.body._id, function (err, user) {
          if (err) return res.json({Status:"Failed",Message:"Internal Server Error", Data : {},Code:500});
          res.json({Status:"Success",Message:"SubFunction Deleted successfully", Data : {} ,Code:200});
      });
});
module.exports = router;
