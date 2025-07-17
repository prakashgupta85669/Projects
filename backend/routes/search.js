const express = require('express');
const User = require('../models/User');
const Medicine = require('../models/Medicine');

const router = express.Router();

router.post('/find', async (req, res) => {
    const { medicineNames, location } = req.body;

    try {
        const shopkeepers = await User.find({
            userType: 'shopkeeper',
            'location.country': location.country,
            'location.state': location.state,
            'location.city': location.city,
            'location.district': location.district,
            'location.localArea': location.localArea
        });

        if (!shopkeepers.length) return res.status(404).json({ msg: "No shops found in this area" });

        const results = [];
        for (const shop of shopkeepers) {
            const medicines = await Medicine.find({
                shopkeeper: shop._id,
                name: { $in: medicineNames }
            });

            if (medicines.length > 0) {
                results.push({
                    shopId: shop._id,
                    shopName: shop.shopName,
                    mobile: shop.mobile,
                    location: shop.location,
                    medicines: medicines.map(m => ({
                        name: m.name,
                        quantity: m.quantity
                    }))
                });
            }
        }

        if (!results.length) return res.status(404).json({ msg: "No shops found with the requested medicines" });

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
