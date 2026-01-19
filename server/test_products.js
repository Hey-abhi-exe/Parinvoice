async function testProducts() {
    try {
        console.log("Testing Products API...");

        // 0. Create User
        const userRes = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: "test@example.com", password: "password", name: "Test User" })
        });

        let user = await userRes.json();
        if (!user.token && !user.user) {
            const loginRes = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: "test@example.com", password: "password" })
            });
            user = await loginRes.json();
        }

        console.log("User:", user.user ? user.user.email : "Unknown");
        const userId = user.user ? user.user.id : null;

        if (!userId) {
            console.error("Failed to get User ID. Aborting.");
            return;
        }

        // 1. Create Product
        const res1 = await fetch('http://localhost:3001/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "Web Design", description: "Standard Service", price: 500, userId: userId })
        });
        const p1 = await res1.json();
        console.log("Created:", p1);

        // 2. List Products
        const res2 = await fetch('http://localhost:3001/api/products');
        const list = await res2.json();
        console.log("List Count:", list.length);
        if (list.length > 0) console.log("First Item Name:", list[0].name);

    } catch (e) {
        console.error('Error:', e);
    }
}
testProducts();
