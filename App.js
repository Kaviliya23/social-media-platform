// App.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(express.static('public'));

// server.js

// Initialize empty arrays for storing users and posts
let users = [];
let posts = [];

// Routes for handling users and posts
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', upload.single('image'), (req, res) => {
  const { content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const newPost = { content, imageUrl };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });



