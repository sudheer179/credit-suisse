var express = require('express');
var router = express.Router();
const userController = require("./../controller/UserController");

/* GET users listing. */
router.get('/', userController.getAllUsers);
router.post('/', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/:userId', userController.removeUser);

module.exports = router;
