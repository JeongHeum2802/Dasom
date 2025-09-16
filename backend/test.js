require('dotenv').config();

const User = require('./models/user');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

async function run() {
  const user = await User.findOne({ "main.naverId": "NNuH1zGCczSOBBu-sCo9_dVGgY7I5j1EhcTJucKY6_w" });
  user.others.friends = []

  await user.save();
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("몽고디비 연결 성공!");
  app.listen(3000);
  console.log("서버 연결 성공!");
}).catch(err => {
  console.log(err);
})

run();
