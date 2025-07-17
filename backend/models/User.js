const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    userType: { type: String, enum: ['customer', 'shopkeeper'], required: true },
    shopName: { type: String },
    location: {
        country: String,
        state: String,
        city: String,
        district: String,
        localArea: String
    }
});

module.exports = mongoose.model('User', UserSchema);
