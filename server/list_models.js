const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    try {
        const key = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        if (data.models) {
            const geminiModels = data.models
                .filter(m => m.name.includes('gemini'))
                .map(m => m.name);
            console.log("Gemini Models:", JSON.stringify(geminiModels, null, 2));
        } else {
            console.log("No models found or error:", data);
        }
    } catch (e) {
        console.error(e);
    }
}
listModels();
