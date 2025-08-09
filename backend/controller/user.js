require('dotenv').config();

const axios = require('axios');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.getUsers = async (req, res, next) => {
    try {
        const naverId = req.params.naverId;

        const otherUsers = await User.find({
            "main.naverId": { $ne: naverId }
        }, 'main');

        res.json(otherUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "서버 에러 발생!" });
    }
};

exports.loginUser = async (req, res, next) => {
    const client_id = process.env.CLIENT_ID;
    const redirectURI = process.env.REDIRECT_URI;
    const state = 'RAMDOM_STATE'

    const api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirectURI) + '&state=' + state;
    res.json({
        login_url: api_url
    })
};

exports.callBack = async (req, res, next) => {
    const code = req.query.code;
    const state = req.query.state;

    try {
        const tokenRes = await axios.get("https://nid.naver.com/oauth2.0/token", {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                code,
                state
            }
        });

        const profileRes = await axios.get("https://openapi.naver.com/v1/nid/me", {
            headers: {
                Authorization: `Bearer ${tokenRes.data.access_token}`
            }
        });

        const naverId = profileRes.data.response.id;

        let user = await User.findOne({ "main.naverId": naverId });

        console.log(user);

        if (!user) {
            const currentYear = new Date().getFullYear();
            user = await User.create({
                main: {
                    name: profileRes.data.response.name,
                    age: currentYear - profileRes.data.response.birthyear + 1,
                    gender: profileRes.data.response.gender,
                    naverId: profileRes.data.response.id
                }
            });
        };

        console.log("네이버 유저 정보", profileRes.data);
        console.log("토큰 응답", tokenRes.data);
        console.log(user);
        res.send(`
            <!DOCTYPE html><html><head><title>Login Success</title></head><body>
            <script>
              window.opener.postMessage({type: 'login-success',payload: ${JSON.stringify(user)}}, 'http://localhost:5173/');
              window.close();
            </script>
            </body></html>
            `);
    } catch (err) {
        console.log(err);
        res.status(500).send("서버 이상");
    }
};

exports.updateUserData = async(req, res, next)=>{
    const {MBTI, profileImageUrl, naverId} = req.body;
    
    let user = await User.findOne({"main.naverId" : naverId});

    user.main.profileImageUrl = profileImageUrl;
    user.main.MBTI = MBTI;

    user.save();

    console.log(user);

    res.end();
}

exports.plusFriend = async(req, res, next) => {
    const {friendNaverId, myNaverId} = req.body;

    let user = await User.findOne({"main.naverId" : myNaverId });

    let userFriends = user.others.friends;

    if(userFriends.includes(friendNaverId)){
        res.send({message: "이미 친구인 유저입니다!"});
    }

    const updatedFriends = [friendNaverId, ...userFriends];

    user.others.friends = updatedFriends;

    await user.save();

    console.log(user.others.friends);

    res.end();
}