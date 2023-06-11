const router = require('express').Router();
const authController=require('../controllers/auth/auth')
const authCheck = require('../Middleware/auth');

router.post('/',authCheck.checkUser)

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports=router