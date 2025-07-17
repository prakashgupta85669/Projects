const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { email, password, userType, mobile, location, shopName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        if (!email || !password || !userType) {
            return res.status(400).json({ msg: "Please enter all required fields" });
        }

        if (userType === 'shopkeeper') {
            if (!mobile || !shopName || !location?.country || !location?.state || !location?.city || !location?.district || !location?.localArea) {
                return res.status(400).json({ msg: "Please enter all shopkeeper details" });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            userType,
            mobile: userType === 'shopkeeper' ? mobile : undefined,
            shopName: userType === 'shopkeeper' ? shopName : undefined,
            location: userType === 'shopkeeper' ? location : {}
        });

        await newUser.save();
        res.json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const payload = { userId: user._id, userType: user.userType };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, email: user.email, userType: user.userType } });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
