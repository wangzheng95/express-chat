const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();

// GET  /欢迎页面
router.get("/", (req, res) => {
    console.log(req.session);

    res.render("welcome")
})

// GET  /chatroom 聊天室
router.get('/chatroom', auth, (req, res) => {
    res.render('chatroom', { username: req.auth.username })
})


// GET /login   登陆页面
router.get('/login', (req, res) => {
    // 可以获取？传参
    const redirect = req.query.redirect || '/'

    res.render('login', { redirect })
})

// GET /posts  帖子列表页面
router.get('/posts', auth, (req, res) => {
    res.render('post/index', )
})


module.exports = router