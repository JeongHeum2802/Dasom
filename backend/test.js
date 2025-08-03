// test-socket.js
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

// 방 참여
socket.emit("joinRoom", "688e3cb78d58b55957cb00e5");

// 메시지 수신
socket.on("receiveMessage", (message) => {
  console.log("새 메시지:", message);
});

// 메시지 전송
socket.emit("sendMessage", {
  roomId: "688e3cb78d58b55957cb00e5",
  senderId: "688e36e031a1a25045bb16c7",
  text: "시선이가 짱임"
});
