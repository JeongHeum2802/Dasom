const express = require('express');

const router = express.Router();

const chatRoomController = require('../controller/chatroom');

router.post('/chatRoom', chatRoomController.getChatroom);

module.exports = router;