const Chatroom = require('../models/chatroom');
const Message = require('../models/message');

exports.getChatroom = async (req, res, next) => {
    try {
        const { myNaverId, you } = req.body;

        let chatroom;

        chatroom = await Chatroom.findOne({
            participants: { $all: [myNaverId, you] }
        });

        if (!chatroom) {
            chatroom = await Chatroom.create({ participants: [myNaverId, you] });
        }

        const messages = await Message.find({ chatRoom: chatroom._id }).sort({ createdAt: -1 });
        res.send({
            roomId: chatroom._id,
            messages
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "서버 에러 발생" });
    }
};

exports.getChatroom = async (req, res, next) => {
    try {
        let { chatRoomId, participants } = req.body;
        console.log(req.body);
        let chatroom;

        if (!chatRoomId) {
            chatroom = await Chatroom.findOne({
                participants: { $all: participants }
            });
        }

        if (!chatroom) {
            chatroom = await Chatroom.create({ participants });
        } else {
            chatRoomId = chatroom._id;
            chatroom = await Chatroom.findById(chatRoomId);
        }

        const messages = await Message.find({ chatRoom: chatroom._id })
            .sort({ createdAt: 1 });

        res.json({
            chatRoomId: chatroom._id,
            messages
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"서버 에러 발생"});
    }
};