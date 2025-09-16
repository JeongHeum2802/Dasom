require('dotenv').config();

const axios = require('axios');
const User = require('../models/user');
const mongoose = require('mongoose');
const Alarm = require('../models/alarm');

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

exports.updateUserData = async (req, res, next) => {
    //프론트에서 유저의 추가 정보들 받기 (여기 항목들말고도 추가로 들어올 수도 있음)
    const { MBTI, profileImageUrl, naverId } = req.body;

    let user = await User.findOne({ "main.naverId": naverId });

    //해당 유저의 추가 정보들 저장(해당 정보는 원래 없었고, 들어오는 정보들은 전부 유효하다고 가정)
    user.main.profileImageUrl = profileImageUrl;
    user.main.MBTI = MBTI;

    //해당 유저의 변경점 저장
    user.save();

    console.log(user);

    res.end();
}

exports.plusFriend = async (req, res, next) => {
    //내 네이버 아이디와 친구의 네이버 아이디를 프론트에서 받아옴
    const { myNaverId, friendNaverId } = req.body;
    try {
        //먼저 내 정보를 불러옴
        let user = await User.findOne({ "main.naverId": myNaverId });

        //내 친구들의 목록을 불러옴
        let userFriends = user.others.friends;

        //만약 내 친구들 목록에 해당 유저가 이미 있는 경우 이렇게 반환 후 종료
        if (userFriends.includes(friendNaverId)) {
            return res.send({
                state: "fail",
                message: "이미 친구인 유저입니다!"
            });
        }

        //아닐 경우 해당 유저를 껴서 새로운 배열 만들기
        const updatedFriends = [friendNaverId, ...userFriends];

        //새로운 배열을 친구 목록으로 저장
        user.others.friends = updatedFriends;

        await user.save();

        console.log(user.others.friends);

        return res.send({
            state: "success",
            message: "친구추가가 성공적으로 완료됐습니다!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("서버 이상");
    }
}

exports.deleteFriend = async (req, res, next) => {
    const { myNaverId, friendNaverId } = req.body;

    try {
        await User.updateOne(       //친구 목록에서 friendNaverId와 같은 친구 삭제
            { "main.naverId": myNaverId },
            { $pull: { "others.friends": friendNaverId } }
        );

        res.status(200).send({ message: "삭제 성공!!" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "서버 오류!" });
    }
}

// controller/user.js
exports.saveUserInfo = async (req, res) => {
    try {
        const { naverId, name, mbti, profileImageUrl } = req.body;

        if (!naverId || !name || !mbti || !profileImageUrl) {
            return res.status(400).json({ message: '필수값이 누락되었습니다.' });
        }

        // 업데이트 후 문서 반환
        const updatedUser = await User.findOneAndUpdate(
            { 'main.naverId': naverId },
            {
                $set: {
                    'main.name': name,
                    'main.MBTI': mbti,
                    'main.initUser': false,
                    'main.profileImageUrl': profileImageUrl,
                }
            },
            { upsert: true, new: true }
        );

        res.json({
            message: '저장 완료!',
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            message: '저장 중 오류가 발생했습니다.',
            error: err.message
        });
    }
};

exports.getUserAlarm = async (req, res, next) => {
    try {
        const { naverId } = req.params;

        await Alarm.deleteMany({ myNaverId: naverId, isRead: true });

        const alarms = await Alarm.find({ "myNaverId": naverId });

        if (!alarms || alarms.length === 0) {
            return res.send({ message: "알람이 없습니다" });
        }

        res.status(200).send({
            message: "알람 가져오기 성공",
            alarms
        });
    } catch (err) {
        res.status(500).send({ message: "서버 오류 발생", error: err });
    }
}

exports.makeAlarm = async (req, res, next) => {
    try {
        const { from, type, to } = req.body;

        const user = await User.findOne({ "main.naverId": from });

        const name = user.main.name;

        const alarm = await Alarm.create({
            myNaverId: to,
            fromUser: from,
            type: type,
            message: "" + name + "님이 친구추가를 했습니다!"
        });

        res.send(alarm);
    } catch (err) {
        res.status(500).send({ message: "서버 오류 발생", error: err });
    }
}
