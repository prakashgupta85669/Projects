const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicine');
const searchRoutes = require('./routes/search');

app.use('/api/auth', authRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/search', searchRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('🚀 Medical Locator API is Running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
