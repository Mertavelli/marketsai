const express = require("express");
const router = express.Router();
const Source = require("../models/Source");

router.post("/create-source", async (req, res) => {
    console.log(req.body)
    try {
        const { dealId, source, title, snippet, url } = req.body;

        if (!dealId || !source || !title || !snippet || !url) {
            return res.status(400).json({
                message: "source, title und snippet sind erforderlich."
            });
        }

        const sourceObject = new Source({
            dealId,
            source,
            title,
            snippet,
            url
        });

        const saved = await sourceObject.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Fehler beim Speichern des Reports:", err);
        res.status(500).json({ message: "Interner Serverfehler beim Speichern." });
    }
});

router.get("/deal/:dealId", async (req, res) => {
    const dealId = req.params.dealId;
    console.log("📥 /source/:id wurde aufgerufen");
    console.log("📌 Projekt-ID:", dealId);

    try {
        const sources = await Source.find({ "dealId": dealId }).sort({ createdAt: -1 });

        console.log(`✅ ${sources.length} sources gefunden`);
        res.status(200).json(sources);
    } catch (err) {
        console.error("❌ Fehler beim Abrufen:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

module.exports = router;
