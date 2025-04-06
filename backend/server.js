const express = require('express');
require('dotenv').config(); // ✅ Loads .env variables
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('colors'); // 🎨 Colorful logs

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection'.yellow);

  socket.on('joinDocument', (documentId) => {
    socket.join(documentId);
    console.log(`User joined document ${documentId}`.magenta);
  });

  socket.on('documentUpdate', ({ documentId, title, content }) => {
    socket.to(documentId).emit('receiveUpdate', { title, content });
  });

  socket.on('sendMessage', ({ documentId, message }) => {
    socket.to(documentId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected'.gray);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.green.bold);
});
