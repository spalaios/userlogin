const express = require('express');
const multer = require('multer');
const { check, validationResult } = require('express-validator/check');




const diskStorage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads/')
    },

    filename : function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage : diskStorage});


const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('will get all the users');
});

router.get('/register', (req, res, next) => {
    res.render('register', {
        title : 'register',
        errors : [{}]
    });
});


router.post('/register', upload.single('profileimage'),(req, res, next) => {
     // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('confirmpassword','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
      console.log(errors);
  	res.render('register', {
        title : 'register',
  		errors: errors
      });
    //   return res.json({
    //       errors : errors
    //   });
  } else{
  	console.log('No Errors');
  }
});



module.exports = router;