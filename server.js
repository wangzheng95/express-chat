// 引入express
const express = require('express');
// 引入express-async-errors
require('express-async-errors');
// 引入路由中间件文件
const indexRouter = require('./routers/indexRouter')
const userRouter = require('./routers/userRouter')

// 生成express实例
const app = express();

// 处理一下模板引擎相关的设置
app.set("view engine", "ejs")
app.set("views", './views')

// 处理一下中间件
app.use(express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// 处理路由中间件
app.use('/', indexRouter)
app.use('/users', userRouter)

// 统一处理错误，需要放置在中间件与路由代码之后
app.use((err, req, res, naxt) => {
    console.log(err);
    res.status(500).send(err.message)
})

// 监听端口，启动服务
const server = app.listen(3333, () => {
    console.log('服务启动成功');
})