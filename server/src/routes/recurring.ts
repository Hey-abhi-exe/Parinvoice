import { Router } from 'express';
import { prisma } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// GET all profiles
router.get('/', async (req, res) => {
    const userId = (req as any).user.userId;
    try {
        const profiles = await prisma.recurringProfile.findMany({
            where: { userId },
            include: { client: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

// POST create profile
router.post('/', async (req, res) => {
    const userId = (req as any).user.userId;
    const { clientId, name, cronSchedule, nextRun, items, total } = req.body;

    try {
        const profile = await prisma.recurringProfile.create({
            data: {
                userId,
                clientId,
                name,
                cronSchedule,
                nextRun: new Date(nextRun),
                items: JSON.stringify(items),
                total
            }
        });
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

// PUT update profile
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, nextRun, name, cronSchedule, items, total } = req.body;

    try {
        const profile = await prisma.recurringProfile.update({
            where: { id },
            data: {
                status,
                nextRun: nextRun ? new Date(nextRun) : undefined,
                name,
                cronSchedule,
                items: items ? JSON.stringify(items) : undefined,
                total
            }
        });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// DELETE profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.recurringProfile.delete({ where: { id } });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

export default router;
