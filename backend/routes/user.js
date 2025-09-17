const express = require('express');

const router = express.Router();

const userController = require('../controller/user');

router.get('/main/:naverId', userController.getUsers);
router.get('/naverLogin', userController.loginUser);
router.get('/callback', userController.callBack);
router.post('/plusFriend', userController.plusFriend);
router.put('/deleteFriend', userController.deleteFriend);
router.post('/saveInfo',userController.saveUserInfo);
router.get('/getUserAlarm/:naverId', userController.getUserAlarm);
router.post('/makeAlarm', userController.makeAlarm);

module.exports = router;
