const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController')
const {passwordsMatch, isNewUser, hashPwd, doesUserExist} = require('../middleware/usersMiddleware')



///Add Validation Middleware to POST/PUT routes
router.post('/signup', passwordsMatch, isNewUser, hashPwd, UsersController.signup)

router.post('/login', doesUserExist,  UsersController.login)


module.exports = router;
