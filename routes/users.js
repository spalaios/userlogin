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


router.post('/register', upload.single('profileimage'),[
    check('name').isLength({min:5}).withMessage('name cannot be empty'),
    check('email').isEmpty().withMessage('email cannot be empty')
],(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()) {
        res.render('register', {
            title : 'register',
            errors : errors.array()
        });
    } else {
        res.render('login', {
            title : 'login'
        });
    }
});



module.exports = router;