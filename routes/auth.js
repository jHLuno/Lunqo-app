const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Brand = require('../models/Brand');

const SECRET_KEY = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Input validation helper
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input) {
  return String(input).trim().replace(/[<>]/g, '');
}

// Brand login
router.post('/brand', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Validate and sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (sanitizedPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const brand = await Brand.findOne({ email: sanitizedEmail });
    if (!brand) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Use bcrypt to compare passwords
    const isPasswordValid = await brand.comparePassword(sanitizedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ brandId: brand._id }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token, brandId: brand._id });
  } catch (error) {
    // Use conditional logging for production
    if (process.env.NODE_ENV !== 'production') {
      console.error('Brand login error:', error);
    }
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

    // Validate and sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (sanitizedPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (sanitizedEmail !== ADMIN_EMAIL || sanitizedPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ isAdmin: true }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    // Use conditional logging for production
    if (process.env.NODE_ENV !== 'production') {
      console.error('Admin login error:', error);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
