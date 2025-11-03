const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

router.post("/", async (req, res) => {
    try {
        const { token, dealId, reportId, user } = req.body;

        if (!token || !dealId || !reportId) {
            return res.status(400).json({ message: "token, dealId und reportId sind erforderlich." });
        }

        const origin = req.headers.origin || "http://localhost:3000";
        const siteUrl = `${origin}/pages/deals/${dealId}/reports/${reportId}`;
        const serializedUser = encodeURIComponent(JSON.stringify(user));
        const authUrl = `${origin}/accept-token?token=${token}&redirect=${encodeURIComponent(siteUrl)}&user=${serializedUser}`;


        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 1024 });

        console.log("➡️ Redirect zu:", authUrl);
        await page.goto(authUrl, { waitUntil: "networkidle0" });

        // ⏳ Warte 2–3 Sekunden, bis der Token im LocalStorage gesetzt wurde und Seite vollständig gerendert ist
        await page.waitForTimeout?.(3000) ?? new Promise(resolve => setTimeout(resolve, 3000));

        console.log("📄 PDF-Seite:", siteUrl);
        await page.goto(siteUrl, { waitUntil: "networkidle0" });

        await page.addStyleTag({
            content: `
    .pdf-ignore {
      display: none !important;
    }

    .pdf-page-break {
      page-break-before: always;
      break-before: always;
      height: 0px;
      margin: 0;
      padding: 0;
    }
  `
        });


        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdfBuffer.length,
            "Content-Disposition": `attachment; filename=investment-memo-${dealId}.pdf`,
        });

        return res.status(200).send(pdfBuffer);
    } catch (err) {
        console.error("❌ Fehler beim PDF-Export:", err);
        return res.status(500).json({ message: "Fehler beim PDF-Export" });
    }
});

module.exports = router;
