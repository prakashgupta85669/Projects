const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
