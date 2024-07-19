const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Create an Express application
const app = express();

// Apply CORS middleware to Express
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONT_REACT_URL, // The origin you want to allow
        methods: ["GET", "POST"], // Allowed methods
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_room', (data) => {
        console.log('user joind');
        socket.join(data);
    })

    // Listen for a custom event
    socket.on('message', (data) => {
        socket.to(data.room).emit('response', {message: data});
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

});

// Start the server
const port = process.env.PORT || 4001;
server.listen(port, () => {
    console.log('Server is running on port',port);
  });