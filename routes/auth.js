import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();

router.post('/signup', async (req, res) => {
  try {
    const { password, ...otherUserInfo } = req.body;

    const existingUser = await User.findOne({ email: otherUserInfo.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...otherUserInfo,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: '+error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error: '+error.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict'
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;