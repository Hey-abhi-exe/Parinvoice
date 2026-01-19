const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testMixed() {
    console.log("---- Testing Regex Actions (Should Succeed) ----");
    try {
        const p1 = "Add new client Space X with email elon@spacex.com";
        console.log(`Prompt: ${p1}`);
        const r1 = await fetch('http://localhost:3001/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: p1 })
        });
        console.log("Response:", await r1.json());

        const p2 = "Add product Mars Ticket for $500000";
        console.log(`\nPrompt: ${p2}`);
        const r2 = await fetch('http://localhost:3001/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: p2 })
        });
        console.log("Response:", await r2.json());

    } catch (e) {
        console.error("Regex Test Failed:", e);
    }

    console.log("\n---- Testing AI Invoice (Might Fail with Quota) ----");
    try {
        const p3 = "Create an invoice for Space X for $1000 for fuel";
        console.log(`Prompt: ${p3}`);
        const r3 = await fetch('http://localhost:3001/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: p3 })
        });
        console.log("Response:", await r3.json());
    } catch (e) {
        console.error("AI Test Failed:", e);
    }
}
testMixed();
