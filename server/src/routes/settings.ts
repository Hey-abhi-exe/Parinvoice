import express from 'express';
import { prisma } from '../db';

const router = express.Router();

// Get Settings
router.get('/', async (req, res) => {
    try {
        // In real app, get userId from auth middleware
        // Demo: find first user or use query param
        const userId = req.headers['x-user-id'] as string || (await prisma.user.findFirst())?.id;

        if (!userId) return res.status(404).json({ error: "User not found" });

        let settings = await prisma.settings.findUnique({ where: { userId } });

        if (!settings) {
            // Create default settings if not exists
            settings = await prisma.settings.create({
                data: { userId }
            });
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch settings" });
    }
});

// Update Settings
router.put('/', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] as string || (await prisma.user.findFirst())?.id;
        if (!userId) return res.status(404).json({ error: "User not found" });

        const { currency, taxRate, taxLabel, logoUrl, brandColor, invoiceNote } = req.body;

        const settings = await prisma.settings.upsert({
            where: { userId },
            update: {
                currency,
                taxRate: parseFloat(taxRate),
                taxLabel,
                logoUrl,
                brandColor,
                invoiceNote
            },
            create: {
                userId,
                currency,
                taxRate: parseFloat(taxRate),
                taxLabel,
                logoUrl,
                brandColor,
                invoiceNote
            }
        });

        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update settings" });
    }
});

export default router;
