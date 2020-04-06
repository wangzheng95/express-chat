// 引入express
const express = require('express');
// 引入wocket.io
const socketIo = require('socket.io')
    // 引入express-async-errors
require('express-async-errors');
const session = require('express-session')
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

/**
 * session处理
 * 会给 req 对象添加一个session属性
 * 注意：在开发工作中，修改了代码，session 就会宠重新开始
 */
app.use(session({
    secret: "adggagsfgsgsergsdfg",
    resave: false, //是否每次请求时都去更新有效时间
    saveUninitialized: true //是否初始化时就设置一次
}));

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

// 通过socketio的listen方法与当前服务器关联
const io = socketIo.listen(server)

// 建立 io 的 conne 事件去处理哭护短链接
io.on("connection", socket => {
    // 提供一个事件将做setname，让客户端去设置名字
    // 客户端连接到服务器之后，第一个要做的事情就是调用（触发）setName 这个事件
    socket.on('setName', username => {
        // 给当前socket添加一个名字，值就是传递郭磊的username
        socket.username = username

        // 给其他人发送系统消息，xxx加入聊天室
        socket.broadcast.emit('message', {
            // username 代表谁说的
            username: "System",
            message: `欢迎${socket.username}加入聊天室`
        })
    })

    // 监听messa
    socket.on('message', data => {
        // data{message:value}

        // 转给当前客户端
        socket.emit('message', {
            username: socket.username,
            message: data.message
        })

        // 转发给其他客户端
        socket.broadcast.emit('message', {
            username: socket.username,
            message: data.message
        })
    })

})