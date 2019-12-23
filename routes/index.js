const express =require('express');

const router=express.Router();

/** importing the controller/index file */
const userController = require('../controllers/usercontroller');

/**
 * ? Routes for the home page...
 * * get
 * * post
 */
router.get('/',function(req,res,next){
  res.render('home',{home_active:"active"});
});

router.post('/',userController.findByEmail);

/**
 * Routes for the finding
 * ? users having birthday at particular date
 */

router.get('/findbirthday',function(req,res){
  res.render('findbirthday',{find_birthday:"active"})
});

router.post('/findbirthday',userController.findbirthday);



/**
 * Routes for the form page
 * * get
 * * post
 */

router.get('/form',function(req,res,next){
  res.render('form',{form_active:"active"});
});



router.post('/form',userController.CreateUser,(err,res)=>{
  if(err){
    console.log("Error in insertion");
  }
  else
  console.log("Insertion successful");
});









module.exports=router;