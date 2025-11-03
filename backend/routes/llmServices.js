const router = require("express").Router();
const axios = require("axios");

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

router.post("/chat", async (req, res) => {
    const fullUrl = req.headers["x-page-url"] || "";
    console.log("🌐 Aufrufende Seite (X-Page-Url):", fullUrl);

    const urlParts = fullUrl.split("/");
    const lastSegment = urlParts[urlParts.length - 1] || "";

    const extendedBody = {
        messages: req.body,
        pageSlug: lastSegment,
    };

    try {
        const response = await axios.post(`${PYTHON_BACKEND_URL}/chat`, extendedBody);
        res.status(response.status).json(response.data);
    } catch (error) {
        const errorMessage = error?.response?.data || error.message;
        const statusCode = error?.response?.status || 500;

        console.error(`Fehler bei /chat (${statusCode}):`, errorMessage);
        res.status(500).json({ message: "Fehler beim Weiterleiten an /chat." });
    }
});


router.post("/investment-memo", async (req, res) => {
    const pageUrl = req.headers["x-page-url"] || "";
    console.log("🌐 Aufrufende Seite (X-Page-Url):", pageUrl);

    const workflowSlug = pageUrl.split("/").pop(); // holt z.B. "Startup-CDD" oder "Buyout-CDD"
    console.log("🔍 Erkannter Workflow:", workflowSlug);

    switch (workflowSlug) {
        case "Buyout-CDD":
            console.log("📌 Buyout-CDD erkannt – CrewAI-Flow wird gestartet.");

            try {
                const response = await axios.post(`${PYTHON_BACKEND_URL}/buyout-cdd`, req.body.messages);

                console.log("✅ Antwort von CrewAI erhalten:", JSON.stringify(response?.data, null, 2));
                return res.status(200).json(response.data);

            } catch (error) {
                const statusCode = error?.response?.status || 500;
                const errorMessage = error?.response?.data || error.message;
                console.error(`❌ Fehler beim Aufruf von CrewAI (${statusCode}):`, errorMessage);
                return res.status(500).json({ message: "Fehler beim Aufruf von CrewAI für Buyout-CDD." });
            }

        case "Startup-CDD":
            try {
                console.log("📤 Anfrage an Python-Backend:", `${PYTHON_BACKEND_URL}/investment-memo`);
                console.log("📦 Gesendeter Payload:", req.body);

                const response = await axios.post(`${PYTHON_BACKEND_URL}/investment-memo`, req.body.messages);

                console.log("✅ Antwort vom Python-Backend erhalten:", JSON.stringify(response?.data, null, 2));
                return res.status(200).json(response.data);

            } catch (error) {
                const statusCode = error?.response?.status || 500;
                const errorMessage = error?.response?.data || error.message;
                console.error(`❌ Fehler bei /investment-memo (${statusCode}):`, errorMessage);
                return res.status(500).json({ message: "Fehler beim Weiterleiten an /investment-memo." });
            }

        default:
            console.warn("⚠️ Unbekannter Workflow – keine Aktion durchgeführt.");
            return res.status(400).json({ message: "Unbekannter Workflow." });
    }
});




router.post("/generate-text", async (req, res) => {
    try {
        const response = await axios.post(`${PYTHON_BACKEND_URL}/generate-text`, req.body);
        res.status(200).json(response.data);

    } catch (error) {
        const statusCode = error?.response?.status || 500;
        const errorMessage = error?.response?.data || error.message;
        console.error(`❌ Fehler bei /generate-text (${statusCode}):`, errorMessage);
        res.status(statusCode).json({ message: "Fehler bei der Textgenerierung.", detail: errorMessage });
    }
});

router.post("/get-news", async (req, res) => {
    try {
        const response = await axios.post(`${PYTHON_BACKEND_URL}/get-news`, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        const statusCode = error?.response?.status || 500;
        const errorMessage = error?.response?.data || error.message;
        console.error(`❌ Fehler bei /get-news (${statusCode}):`, errorMessage);
        res.status(statusCode).json({ message: "Fehler beim Abrufen der News.", detail: errorMessage });
    }
});


module.exports = router;
