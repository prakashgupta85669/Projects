// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Medicine = require('../models/Medicine');

// const router = express.Router();

// // Auth middleware
// const auth = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch {
//         res.status(400).json({ msg: "Token is not valid" });
//     }
// };

// // Add Medicine
// router.post('/add', auth, async (req, res) => {
//     if (req.user.userType !== 'shopkeeper') return res.status(403).json({ msg: "Access denied" });

//     const { name, quantity } = req.body;
//     if (!name || !quantity) return res.status(400).json({ msg: "Name and quantity are required" });

//     try {
//         const medicine = new Medicine({
//             shopkeeper: req.user.userId,
//             name,
//             quantity
//         });
//         await medicine.save();
//         res.json({ msg: "Medicine added", medicine });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//     }
// });

// // Remove Medicine
// router.delete('/remove/:id', auth, async (req, res) => {
//     try {
//         const medicine = await Medicine.findById(req.params.id);
//         if (!medicine) return res.status(404).json({ msg: "Medicine not found" });
//         if (medicine.shopkeeper.toString() !== req.user.userId) return res.status(401).json({ msg: "Not authorized" });

//         await medicine.deleteOne();
//         res.json({ msg: "Medicine removed" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//     }
// });

// module.exports = router;




const express = require('express');
const jwt = require('jsonwebtoken');
const Medicine = require('../models/Medicine');

const router = express.Router();

// Auth middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ msg: "Token is not valid" });
    }
};

// Add Medicine (Shopkeeper)
router.post('/add', auth, async (req, res) => {
    if (req.user.userType !== 'shopkeeper') {
        return res.status(403).json({ msg: "Access denied" });
    }

    const { name, quantity } = req.body;
    if (!name || !quantity) {
        return res.status(400).json({ msg: "Name and quantity are required" });
    }

    try {
        const medicine = new Medicine({
            shopkeeper: req.user.userId, // correctly referencing shopkeeper's userId
            name,
            quantity
        });
        await medicine.save();
        res.json({ msg: "Medicine added", medicine });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Remove Medicine (Shopkeeper)
router.delete('/remove/:id', auth, async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ msg: "Medicine not found" });
        }
        if (medicine.shopkeeper.toString() !== req.user.userId) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await medicine.deleteOne();
        res.json({ msg: "Medicine removed" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// List Medicines (Shopkeeper)
router.get('/list', auth, async (req, res) => {
    try {
        if (req.user.userType !== 'shopkeeper') {
            return res.status(403).json({ msg: "Access denied" });
        }

        const medicines = await Medicine.find({ shopkeeper: req.user.userId });
        res.json(medicines);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
