const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Brand = require('../models/Brand');

const SECRET_KEY = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Brand login
router.post('/brand', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const brand = await Brand.findOne({ email });
    if (!brand || brand.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ brandId: brand._id }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token, brandId: brand._id });
  } catch (error) {
    console.error('Brand login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin login
router.post('/admin', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ isAdmin: true }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
