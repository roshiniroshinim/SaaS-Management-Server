const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.post('/login', async (req, res) => {
  
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If not exists, register
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
      console.log(`New User registered ${email}`);
      return res.status(201).json({ msg: `New User registered ${email}`, token, user: newUser });
    }

    // If exists, check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ msg: "Login successful", token, user: user });
    console.log(`User Login ${email} ...`)

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;