// 引入连接了mongosedb de mongoose
const mongoose = require('../connect')

// 定义Schema
const userSChema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },

    avatar: { type: String, default: "http://localhost:3333/assets/img/avatar.png" }
});

// 生成model
const UserModel = mongoose.model("user", userSChema);

// 暴露
module.exports = UserModel;