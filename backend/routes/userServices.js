// z. B. in routes/user.js oder routes/index.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.post('/update', async (req, res) => {
    const userId = req.header('X-User-Id');
    console.log(userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Ungültige User-ID im Header' });
    }

    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password'); // 👈 optional: Passwort entfernen

        if (!updatedUser) {
            return res.status(404).json({ error: 'User nicht gefunden' });
        }

        res.status(200).json(updatedUser); // 👈 expliziter 200er Status
    } catch (error) {
        console.error('❌ Fehler beim Aktualisieren des Users:', error);
        res.status(500).json({ error: 'Serverfehler' });
    }
});

router.post('/update-profile-picture', async (req, res) => {
    const userId = req.header('X-User-Id');
    const { imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Ungültige User-ID im Header' });
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
        return res.status(400).json({ error: 'Bild-URL fehlt oder ist ungültig' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { logo: imageUrl } },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User nicht gefunden' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('❌ Fehler beim Aktualisieren des Profilbilds:', error);
        res.status(500).json({ error: 'Serverfehler beim Speichern des Bildes' });
    }
});

// GET /companies/public – Liefert alle veröffentlichten Startups
router.get('/companies/public', async (req, res) => {
    console.log("public companies");
    try {
        const publicCompanies = await User.find({ published: true, accountType: "company" }).select(
            "-password -email" // sensible Felder ausblenden
        );

        res.status(200).json(publicCompanies);
    } catch (error) {
        console.error("❌ Fehler beim Abrufen veröffentlichter Unternehmen:", error);
        res.status(500).json({ error: "Serverfehler beim Laden öffentlicher Unternehmen" });
    }
});

// GET /user/:userId – Liefert einen einzelnen User (z. B. für Detailansicht)
router.get('/:userId', async (req, res) => {
    console.log("getUserById");
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('❌ Fehler beim Abrufen des Users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


/* router.get('/:userId/portfolio', async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId).select('portfolio');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.portfolio);
    } catch (error) {
        console.error('❌ Fehler beim Abrufen des Portfolios:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:userId/portfolio', async (req, res) => {
    const { userId } = req.params;
    const { company, capital, stake } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.portfolio.push({ company, capital, stake });
        await user.save();

        res.json(user.portfolio); // oder res.status(200).send('OK')
    } catch (error) {
        console.error('❌ Fehler beim Speichern:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:userId/portfolio/:index', async (req, res) => {
    const { userId, index } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const idx = parseInt(index);
        if (isNaN(idx) || idx < 0 || idx >= user.portfolio.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        user.portfolio.splice(idx, 1); // 🧹 Eintrag entfernen
        await user.save();

        res.json(user.portfolio); // oder einfach res.sendStatus(204)
    } catch (error) {
        console.error('Fehler beim Löschen des Portfolio-Eintrags:', error);
        res.status(500).json({ error: 'Server error' });
    }
}); */

module.exports = router;
