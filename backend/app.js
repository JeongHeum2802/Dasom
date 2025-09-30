require('dotenv').config();

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');
const chatRoomRoutes = require('./routes/chatroom');
const Message = require('./models/message');

app.use(cors({
  origin: ['http://localhost:5173','https://dasom-six.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use(chatRoomRoutes);
app.use(userRoutes);


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('사용자 연결됨: ', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`방 ${roomId}에 참가`);
    });

    socket.on('sendMessage', async (data) => {
        const { roomId, senderId, text } = data;

        const message = await Message.create({
            chatRoom: roomId,
            sender: senderId,
            text
        });

        io.to(roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('사용자 연결 종료', socket.id);
    });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("몽고디비 연결 성공!");
    server.listen(3000);
    console.log("서버 연결 성공!");
}).catch(err => {
    console.log(err);
})