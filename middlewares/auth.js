module.exports = (req, res, next) => {
    // 判断是否登陆了
    if (req.session.auth) {
        // 登陆了
        req.auth = req.session.auth
        next()
    } else {
        // 没登录

        /**
         * A方案
         */
        // 将当前的url地址存起来
        // console.log(req.url);
        // req.session.redirect = req.url
        // res.redirect('/login')

        /**
         * B方案
         * 将当前要去的url地址，追加到/login后面，通过？传参
         */
        res.redirect(`/login?redirect=${req.url}`)
    }
}