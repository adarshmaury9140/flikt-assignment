require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
// 1. Try to get from .env
// 2. Fallback to the link you provided in the file manually
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin123@cluster0.laig0qi.mongodb.net/internship_task?retryWrites=true&w=majority&appName=Cluster0";

console.log("Attempting to connect to:", MONGO_URI.replace(/:([^@]+)@/, ":****@")); // Hide password in logs

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        // Fallback info for user
        console.log("HINT: If you see 'bad auth', check your username/password in the link.");
        console.log("HINT: If you see 'ECONNREFUSED', check your internet.");
    });

// --- ROUTES ---

// 1. REGISTER
app.post('/register', async (req, res) => {
    console.log("➡️ Register Request Recieved:", req.body);

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ status: "Error", message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log("⚠️ User already exists:", email);
            return res.json({ status: "Error", message: "Email already exists" });
        }

        const newUser = await UserModel.create({ name, email, password });
        console.log("✅ User Created:", newUser);

        res.json({ status: "Success", message: "Account Created Successfully!" });

    } catch (err) {
        console.error("❌ Register Unexpected Error:", err);
        res.json({ status: "Error", message: "Internal Server Error" });
    }
});

// 2. LOGIN
app.post('/login', async (req, res) => {
    console.log("➡️ Login Request Recieved:", req.body);

    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ status: "Error", message: "All fields are required" });

        const user = await UserModel.findOne({ email });

        if (user) {
            if (user.password === password) {
                console.log("✅ Password Matched for", user.name);
                res.json({ status: "Success", message: "Login Successful", name: user.name });
            } else {
                console.log("❌ Incorrect Password");
                res.json({ status: "Error", message: "Incorrect Password" });
            }
        } else {
            console.log("⚠️ User not found in DB");
            res.json({ status: "Error", message: "User not found" });
        }

    } catch (err) {
        console.error("❌ Login Unexpected Error:", err);
        res.json({ status: "Error", message: "Internal Server Error" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});