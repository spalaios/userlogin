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
        errorsArray : []
    });
});


router.post('/register',[
    check('name').isLength({min : 5})
], upload.single('profileimage'),(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('register', {
            title : 'register',
            errorsArray : ['e1', 'e2']
        });
    } else {
        res.render('login', {
            title : 'login'
        });
    }
});



module.exports = router;