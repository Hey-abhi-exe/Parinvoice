async function verify() {
    try {
        console.log("Verifying AI endpoint with gemini-flash-latest...");
        const response = await fetch('http://localhost:3001/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: 'Say hello' })
        });
        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log(`Response: ${text}`);
    } catch (e) {
        console.error('Network Error:', e);
    }
}
verify();
