const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");
const User = require("../models/User");
const axios = require("axios");

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

router.post("/create-deal", async (req, res) => {
    try {
        const { title, description, created_by } = req.body;

        if (!title || !created_by) {
            return res.status(400).json({ message: "Title and created_by are required." });
        }

        console.log("BODY: ", req.body);

        // Bild-API anfragen (optional)
        const response = await axios.post(`${PYTHON_BACKEND_URL}/image-key`, req.body);
        const messages = response.data;
        const imageKey = messages[messages.length - 1].content;

        const newDeal = new Deal({
            title,
            description,
            created_by,
            imageKey,
            members: [
                {
                    user: created_by,
                    role: "admin"
                }
            ]
        });

        const savedDeal = await newDeal.save();
        res.status(201).json(savedDeal);
    } catch (err) {
        console.error("Fehler beim Erstellen des Projekts:", err);
        res.status(500).json({ message: "Serverfehler beim Erstellen des Projekts." });
    }
});


router.get("/all", async (req, res) => {
    try {
        const deals = await Deal.find()
            .populate("created_by", "email firstName lastName") // nur bestimmte Felder
            .sort({ createdAt: -1 });

        res.status(200).json(deals);
    } catch (err) {
        console.error("Fehler beim Abrufen der Projekte:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.post("/user-deals", async (req, res) => {
    console.log("Body: ", req.body);
    try {
        const { userId, filterBy, sortBy } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Suche nach Projekten, bei denen der Nutzer in der members-Liste auftaucht
        const query = { "members.user": userId };

        if (filterBy && filterBy !== "All") {
            query.status = filterBy.toLowerCase(); // optionales Status-Field
        }

        let sortQuery = { updatedAt: -1 };
        if (sortBy === "Alphabetical") sortQuery = { title: 1 };
        if (sortBy === "Newest first") sortQuery = { createdAt: -1 };
        if (sortBy === "Oldest first") sortQuery = { createdAt: 1 };
        if (sortBy === "Last modified") sortQuery = { updatedAt: -1 };

        const deals = await Deal.find(query)
            .populate("created_by", "email firstName lastName")
            .populate("members.user", "email firstName lastName")
            .sort(sortQuery);

        res.status(200).json(deals);
    } catch (err) {
        console.error("Fehler beim Abrufen der Projekte des Users:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.post("/members", async (req, res) => {
    try {
        const { dealId } = req.body;

        if (!dealId) {
            return res.status(400).json({ message: "dealId ist erforderlich." });
        }

        const deal = await Deal.findById(dealId).populate("members.user", "email firstName lastName");

        if (!deal) {
            return res.status(404).json({ message: "Projekt nicht gefunden." });
        }

        res.status(200).json(deal.members);
    } catch (err) {
        console.error("❌ Fehler beim Abrufen der Dealmitglieder:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id).populate("created_by", "email");

        if (!deal) {
            return res.status(404).json({ message: "Projekt nicht gefunden" });
        }

        res.status(200).json(deal);
    } catch (err) {
        console.error("Fehler beim Abrufen des Projekts:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.post("/add-member", async (req, res) => {
    try {
        const { userId, dealId, email } = req.body;

        if (!userId || !dealId || !email) {
            return res.status(400).json({ message: "userId, dealId und email sind erforderlich." });
        }

        const deal = await Deal.findById(dealId);
        if (!deal) return res.status(404).json({ message: "Deal nicht gefunden." });

        // Berechtigung prüfen: Ersteller oder bereits Member
        const isAuthorized =
            deal.created_by.toString() === userId ||
            deal.members.some(member => member.user.toString() === userId);
        if (!isAuthorized) return res.status(403).json({ message: "Keine Berechtigung." });

        // Benutzer anhand E-Mail finden
        const userToAdd = await User.findOne({ email: email.toLowerCase().trim() });
        if (!userToAdd) return res.status(404).json({ message: "Benutzer nicht gefunden." });

        // Prüfen, ob schon Mitglied
        const alreadyMember =
            deal.members.some(member => member.user.toString() === userToAdd._id.toString()) ||
            deal.created_by.toString() === userToAdd._id.toString();
        if (alreadyMember) return res.status(400).json({ message: "Benutzer ist bereits Mitglied." });

        // Hinzufügen mit Standardrolle (editor)
        deal.members.push({
            user: userToAdd._id,
            role: "editor"
        });

        await deal.save();

        await deal.populate("members.user", "email firstName lastName");

        res.status(200).json({
            message: "Mitglied hinzugefügt",
            members: deal.members
        });
    } catch (err) {
        console.error("Fehler beim Hinzufügen eines Mitglieds:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.patch("/remove-member", async (req, res) => {
    try {
        const { userId, dealId, memberId } = req.body;

        if (!userId || !dealId || !memberId) {
            return res.status(400).json({ message: "Fehlende Parameter." });
        }

        const deal = await Deal.findById(dealId);
        if (!deal) return res.status(404).json({ message: "Projekt nicht gefunden." });

        // Nur Admin darf löschen
        const requestingMember = deal.members.find(m => m.user.toString() === userId);
        if (!requestingMember || requestingMember.role !== "admin") {
            return res.status(403).json({ message: "Keine Berechtigung zum Entfernen von Mitgliedern." });
        }

        // Member entfernen
        deal.members = deal.members.filter(m => m.user.toString() !== memberId);
        await deal.save();

        await deal.populate("members.user", "email firstName lastName");

        res.status(200).json({ message: "Mitglied entfernt", members: deal.members });
    } catch (err) {
        console.error("❌ Fehler beim Entfernen eines Mitglieds:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});


module.exports = router;
