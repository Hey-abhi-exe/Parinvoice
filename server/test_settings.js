async function testSettings() {
    try {
        console.log("Testing Settings API...");

        // 0. Get User (reuse logic from products test or assume one exists from previous test)
        // Let's just create a new one to be sure or use register
        const email = `test.settings.${Date.now()}@example.com`;
        const userRes = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: "password", name: "Settings Tester" })
        });
        const user = await userRes.json();
        const token = user.token;
        const userId = user.user.id;

        console.log("Registered:", email);

        // 1. Get Default Settings
        const getRes = await fetch('http://localhost:3001/api/settings', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const settings = await getRes.json();
        console.log("Default Settings:", settings);

        // 2. Update Settings
        const updateRes = await fetch('http://localhost:3001/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                currency: 'EUR',
                taxRate: 20,
                brandColor: '#ff0000',
                logoUrl: 'http://test.com/logo.png'
            })
        });
        const updated = await updateRes.json();
        console.log("Updated Settings:", updated.currency === 'EUR' ? 'SUCCESS' : 'FAILED');
        console.log("Brand Color:", updated.brandColor);

    } catch (e) {
        console.error('Error:', e);
    }
}
testSettings();
