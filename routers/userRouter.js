const express = require('express');
const router = express.Router();

// POST  /users/login 登录操作
router.post('/login', (req, res) => {
    console.log(req.body);

    res.send('登录操作')
})


// 暴露
module.exports = router