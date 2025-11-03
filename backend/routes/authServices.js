const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password, firstName, lastName, company, position, industries, accountType, employees } = req.body;

        if (!email || !password || !firstName || !lastName || !accountType) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            company,
            position,
            industries,
            employees,
            accountType
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                company: user.company,
                position: user.position,
                industries: user.industries,
                accountType: user.accountType,
                employees: user.employees,
                published: user.published
            },
            token
        });

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                company: user.company,
                position: user.position,
                industries: user.industries,
                accountType: user.accountType,
                employees: user.employees,
                logo: user.logo || "",
                published: user.published
            },
            token
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Internal server error.", details: error.message });
    }
});


module.exports = router;
