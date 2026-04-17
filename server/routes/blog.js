const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Optional auth — attaches req.user if token present, but doesn't block
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET || 'dreamtech_secret');
    } catch { /* ignore invalid token */ }
  }
  next();
};

// GET /api/blog — all posts, newest first, with comment count and vote count
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 }).lean();
    const result = posts.map(p => ({
      _id: p._id,
      authorName: p.authorName,
      userId: p.userId,
      title: p.title,
      content: p.content,
      createdAt: p.createdAt,
      commentCount: p.comments ? p.comments.length : 0,
      voteCount: p.votes ? p.votes.length : 0,
      votes: p.votes || [],
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/blog/:id — single post with all comments
router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/blog — create post (no auth required)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { authorName, title, content } = req.body;
    if (!authorName || !title || !content)
      return res.status(400).json({ message: 'authorName, title, and content are required' });

    const postData = { authorName, title, content };
    if (req.user) postData.userId = req.user.id;

    const post = await Blog.create(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/blog/:id/comment — add comment (auth required)
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'content is required' });

    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    post.comments.push({ userId: req.user.id, userName: user.name, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/blog/:id/vote — toggle vote (auth required)
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const uid = req.user.id;
    const idx = post.votes.findIndex(v => v.toString() === uid);
    if (idx === -1) {
      post.votes.push(uid); // add vote
    } else {
      post.votes.splice(idx, 1); // remove vote (toggle)
    }
    await post.save();
    res.json({ voteCount: post.votes.length, voted: idx === -1, votes: post.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/blog/:id — delete post (auth required, only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.userId || post.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to delete this post' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
