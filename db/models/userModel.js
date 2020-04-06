// 引入连接了mongosedb 的 mongoose
const mongoose = require('../connect')
const bcryptjs = require('bcryptjs')

// 定义Schema
const userSChema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },

    avatar: { type: String, default: `${process.env.BASEURL}/assets/img/avatar.png` }
});

// 钩子函数，加密密码
userSChema.pre('save', function(next) {
    this.password = bcryptjs.hashSync(this.password, 10)
    next();
})

/**
 *  给usermodel 提供一个原型方法, 
 *  
 */
userSChema.methods.comparePassword = function(password) {
    return bcryptjs.compareSync(password, this.password)
};

// 生成model
const UserModel = mongoose.model("user", userSChema);

// 暴露
module.exports = UserModel;