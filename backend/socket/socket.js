import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: [`${process.env.NODE_ENV === 'development' ? process.env.LOCAL_URI : process.env.RENDER_URI}`],
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('USER CONNECTED', socket.id)

    const userId = socket.handshake.query.userId
    if(userId != "undefined") userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    console.log("USER MAP : ", userSocketMap)
    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED', socket.id)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})


export { app, io, server }