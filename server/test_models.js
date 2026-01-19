const dotenv = require('dotenv');
dotenv.config();

async function listModelsRaw() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API Key found");
        return;
    }

    console.log("Fetching models list from API...");
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await res.json();

        if (data.error) {
            console.error("API Error:", data.error);
        } else if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models returned.", data);
        }
    } catch (e) {
        console.error("Request Failed:", e);
    }
}

listModelsRaw();
