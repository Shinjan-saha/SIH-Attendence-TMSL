// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create an Express app and a server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial attendance data to the client
  io.emit('initialAttendance', {}); // localStorage is not available in server-side code

  socket.on('updateAttendance', (data) => {
    // Broadcast the updated attendance to all connected clients
    io.emit('updatedAttendance', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Export a function that handles HTTP requests
module.exports = async (req, res) => {
  // Use the existing express app to handle HTTP requests
  app(req, res);
};
