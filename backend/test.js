require('dotenv').config();

const Alarm = require('./models/alarm');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

async function run() {
  await Alarm.create({
    myNaverId: "fkQ-WFD3JhOYWkQqngv3nEaq6fM4K-r-LFIaxVZm4SY",
    type: "좋아요",
    fromUser: "황시선",
    message: "황시선님이 좋아요를 눌렀습니다.",
  })
};

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("몽고디비 연결 성공!");
    app.listen(3000);
    console.log("서버 연결 성공!");
}).catch(err => {
    console.log(err);
})

run();
