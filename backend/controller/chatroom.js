const Chatroom = require('../models/chatroom');
const Message = require('../models/message');

exports.getAllChatroom = async (req, res, next) => {

    try {
        const naverId = req.params.naverId;

        const chatrooms = await Chatroom.find({
            participants: {$in : [naverId]}
        })
        .sort({ updatedAt: -1 });

        const chatRoomsWithLastMessage = await Promise.all(chatrooms.map(async (room) => {
            const lastMessage = await Message.find({ chatRoom: room._id })
                .sort({ createdAt: -1 })
                .limit(1);

            return {
                ...room.toObject(),
                lastMessage
            };
        }));

        res.json({
            chatrooms: chatRoomsWithLastMessage
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