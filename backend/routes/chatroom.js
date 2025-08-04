const express = require('express');

const router = express.Router();

const chatRoomController = require('../controller/chatroom');

router.get('/all-chatroom/:naverId', chatRoomController.getAllChatroom);

router.post('/chatRoom', chatRoomController.getChatroom);

module.exports = router;