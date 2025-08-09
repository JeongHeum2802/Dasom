const express = require('express');

const router = express.Router();

const userController = require('../controller/user');

router.get('/main/:naverId', userController.getUsers);
router.get('/naverLogin', userController.loginUser);
router.get('/callback', userController.callBack);
router.post('/updateUser', userController.updateUserData);
router.post('/plusFriend', userController.plusFriend);

module.exports = router;