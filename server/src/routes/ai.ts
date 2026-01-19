import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { prisma } from '../db';

dotenv.config();

const router = express.Router();

// Using gemini-2.0-flash-exp as it typically has better free tier availability than stable 2.0
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

router.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const lowerPrompt = prompt.toLowerCase();

        const firstUser = await prisma.user.findFirst();
        if (!firstUser) return res.json({ text: "Error: No user found. Please register first." });

        // --- HANDLER: CREATE CLIENT ---
        if (lowerPrompt.includes('add client') || lowerPrompt.includes('create client') || lowerPrompt.includes('new client')) {
            const emailMatch = prompt.match(/email\s+([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/i);
            const email = emailMatch ? emailMatch[1] : `client_${Date.now()}@example.com`;

            // cleanup name
            let cleaned = prompt.replace(/(?:add|create|new)\s+client/i, '').trim();
            cleaned = cleaned.replace(/(?:named|called)/i, '').trim();
            // remove email part
            const emailIndex = cleaned.toLowerCase().indexOf('email');
            if (emailIndex > -1) cleaned = cleaned.substring(0, emailIndex).trim();
            // remove with
            cleaned = cleaned.replace(/^with\s+/i, '').replace(/\s+with$/i, '').trim();
            // remove quotes
            const name = cleaned.replace(/^['"]|['"]$/g, '').trim() || "New Client";

            let client = await prisma.client.findFirst({ where: { email, userId: firstUser.id } });
            if (!client) {
                client = await prisma.client.create({
                    data: { userId: firstUser.id, name, email }
                });
                return res.json({
                    response: `✅ Successfully added new client: ${client.name} (${client.email})`,
                    action: 'create_client',
                    parameters: { name, email }
                });
            } else {
                return res.json({
                    response: `ℹ️ Client already exists: ${client.name}`,
                    action: null
                });
            }
        }

        // --- HANDLER: CREATE PRODUCT ---
        if (lowerPrompt.includes('add product') || lowerPrompt.includes('create product') || lowerPrompt.includes('new product')) {
            const priceMatch = prompt.match(/(?:for|at|price)\s+[\$]?(\d+(?:\.\d+)?)/i);
            const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

            let cleaned = prompt.replace(/(?:add|create|new)\s+product/i, '').trim();
            cleaned = cleaned.replace(/(?:named|called)/i, '').trim();
            // remove price part
            cleaned = cleaned.replace(/(?:for|at|price)\s+[\$]?\d+(?:\.\d+)?/i, '').trim();
            // remove quotes
            const name = cleaned.replace(/^['"]|['"]$/g, '').trim() || "New Product";

            const product = await prisma.product.create({
                data: {
                    userId: firstUser.id,
                    name,
                    price,
                    description: 'Added via AI Agent'
                }
            });
            return res.json({
                response: `✅ Added to inventory: ${product.name} - $${product.price}`,
                action: 'create_product',
                parameters: { name, price }
            });
        }

        // 2. FALLBACK TO GEMINI (For Invoices & General Qs)
        const systemInstruction = `
        You are an intelligent system. 
        If the user wants to create an INVOICE, output JSON.
        Otherwise, answer the question helpfully.

        Invoice JSON Structure:
        {
          "action": "create_invoice",
          "parameters": { "clientName": "...", "amount": 100, "description": "..." },
          "response": "Creating invoice..."
        }
        
        If just a question, JSON:
        { "action": null, "response": "Your answer..." }

        Do NOT start with markdown. Output raw JSON.
        `;

        const result = await model.generateContent(`${systemInstruction}\n\n${prompt}`);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(text);
            if (data.action === 'create_invoice') {
                const { clientName, amount, description } = data.parameters;
                let client = await prisma.client.findFirst({ where: { name: clientName, userId: firstUser.id } });
                if (!client) {
                    client = await prisma.client.create({
                        data: { name: clientName, email: "generated@example.com", userId: firstUser.id }
                    });
                }
                const invoice = await prisma.invoice.create({
                    data: {
                        userId: firstUser.id,
                        clientId: client.id,
                        total: amount,
                        status: 'DRAFT',
                        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        items: { create: [{ description, quantity: 1, price: amount, total: amount }] }
                    }
                });
                data.response += ` (Invoice #${invoice.id.substring(0, 6)} generated)`;
            }
            return res.json(data);
        } catch (e) {
            return res.json({ text });
        }

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
