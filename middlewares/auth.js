module.exports = (req, res, next) => {
    // 判断是否登陆了
    if (req.session.auth) {
        // 登陆了
        req.auth = req.session.auth
        next()
    } else {
        // 没登录
        // 将当前的url地址存起来
        console.log(req.url);
        req.session.redirect = req.url

        res.redirect('/login')
    }
}