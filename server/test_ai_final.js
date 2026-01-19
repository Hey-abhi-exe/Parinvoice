const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testAI() {
    console.log("Testing Invoice Creation (Model Route)...");
    try {
        const prompt = "Create an invoice for Apple for $500 for design";
        console.log(`Prompt: ${prompt}`);
        const res = await fetch('http://localhost:3001/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const json = await res.json();
        console.log("Response:", JSON.stringify(json, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}
testAI();
