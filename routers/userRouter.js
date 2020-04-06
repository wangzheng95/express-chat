const express = require('express');
const bcryptjs = require('bcryptjs')
const UserModel = require('../db/models/userModel')
const router = express.Router();

// POST  /users/login 登录操作
router.post('/login', async(req, res) => {
    // console.log(req.body);
    // 获取传递过来的参数
    const { username, password } = req.body;

    // 判断是否注册过
    user = await UserModel.findOne({ username })
    if (!user) {
        // 不存在，先注册
        user = await UserModel.create({ username, password })
    };

    // 校验密码是否正确
    if (user.comparePassword(password)) {
        // 通过，可以登录

        // 给req.session上添加一个 auth 属性，auth属性里面保存当前用户的ID和username等信息
        // 后续判断用户是否登录，只需要判断req.session中有没有auth这个属性即可
        req.session.auth = {
            userId: user._id,
            username: user.username
        }

        // 1.得知道成功以后要去的页面
        // 从req.session.redirect中获取要回到的页面地址
        // let redirect = req.session.redirect || '/'
        //     // 跳转
        // res.redirect(redirect);
        // res.send('登录成功')


        // B方案
        // console.log(req.originalUrl);

        res.redirect(req.query.redirect);

    } else {
        // 不通过，用户名或密码不正确
        throw new Error('用户名或密码不正确')
    }

})




// 暴露
module.exports = router