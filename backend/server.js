import path from 'path'
import connectDB from './db/connection.js'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import './middlewares/passport.js'
import { app, server } from './socket/socket.js'


dotenv.config()

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: `${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URI : process.env.RENDER_URI}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}))

// https://connect-app-ykav.onrender.com

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        ttl: 14 * 24 * 60 * 60
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/message', messageRoute)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})





