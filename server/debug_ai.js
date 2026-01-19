async function debug() {
    try {
        console.log("Testing AI endpoint...");
        const response = await fetch('http://localhost:3001/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: 'Test' })
        });
        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log(`Raw Body: ${text}`);
    } catch (e) {
        console.error('Network/Script Error:', e);
    }
}
debug();
