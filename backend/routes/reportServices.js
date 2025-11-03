const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const BuyoutCDDSchema = require("../models/BuyoutCDDSchema");

router.post("/create-report", async (req, res) => {
    console.log("BODY: ", req.body);
    try {
        const { dealId, metrics, created_by, type } = req.body;

        if (!dealId || !metrics || !created_by || !type) {
            return res.status(400).json({
                message: "dealId, metrics und created_by sind erforderlich."
            });
        }

        let savedMemo;

        switch (type) {
            case "Startup-CDD":
                const startupMemo = new Report({
                    deal: dealId,
                    created_by,
                    type,
                    ...metrics
                });
                savedMemo = await startupMemo.save();
                break;

            case "Buyout-CDD":
                const buyoutMemo = new BuyoutCDDSchema({
                    deal: dealId,
                    created_by,
                    type,
                    ...metrics
                });
                savedMemo = await buyoutMemo.save();
                break;

            default:
                return res.status(400).json({ message: `Unbekannter Typ: ${type}` });
        }

        res.status(201).json(savedMemo);
    } catch (err) {
        console.error("Fehler beim Speichern des Reports:", err);
        res.status(500).json({ message: "Interner Serverfehler beim Speichern." });
    }
});

router.get("/deal/:dealId", async (req, res) => {
    const dealId = req.params.dealId;
    console.log("📥 /report/:id wurde aufgerufen");
    console.log("📌 Projekt-ID:", dealId);

    try {
        const reports = await Report.find({ deal: dealId }).sort({ createdAt: -1 }).populate("deal");

        console.log(`✅ ${reports.length} Reports gefunden`);
        res.status(200).json(reports);
    } catch (err) {
        console.error("❌ Fehler beim Abrufen:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.get("/:reportId", async (req, res) => {
    const reportId = req.params.reportId;

    console.log("📥 /report/:reportId aufgerufen");
    console.log("🔍 Report-ID:", reportId);

    try {
        const report = await Report.findById(reportId).populate("deal");
        console.log("REPORT: ", report)

        if (!report) {
            console.warn("⚠️ Kein Report gefunden für ID:", reportId);
            return res.status(404).json({ message: "Report not found" });
        }

        console.log("✅ Report gefunden:", report._id);
        res.status(200).json(report);
    } catch (err) {
        console.error("❌ Fehler beim Laden des Reports:", err);
        res.status(500).json({ message: "Interner Serverfehler beim Laden des Reports" });
    }
});

router.patch("/update/:reportId", async (req, res) => {
    const reportId = req.params.reportId;
    const updates = req.body;

    try {
        const updated = await Report.findByIdAndUpdate(reportId, updates, {
            new: true, // gibt das aktualisierte Dokument zurück
        });

        if (!updated) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json(updated);
    } catch (err) {
        console.error("❌ Fehler beim Aktualisieren:", err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});



module.exports = router;
