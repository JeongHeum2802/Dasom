const User = require('../models/user');
const mongoose = require('mongoose');

exports.createUser = async (req, res, next) => {
    try {
        const { name, gender, age, MBTI, profileImageUrl } = req.body;

        const newUser = await User.create({
            main :{
                name: name,
                gender : gender,
                age : age,
                MBTI : MBTI,
                profileImageUrl: profileImageUrl
            }   
        });

        res.status(201).json(newUser);
    } catch(err){
        console.log(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);

        const otherUsers = await User.find({
            _id: { $ne: userId }
        }, 'main');

        res.json(otherUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "서버 에러 발생!" });
    }
};




