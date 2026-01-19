import { Router } from 'express';
import { prisma } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
    const userId = (req as any).user.userId;
    try {
        const clients = await prisma.client.findMany({ where: { userId } });
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

router.post('/', async (req, res) => {
    const userId = (req as any).user.userId;
    const { name, email, address } = req.body;
    try {
        const client = await prisma.client.create({
            data: { userId, name, email, address },
        });
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create client' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;
    try {
        const client = await prisma.client.update({
            where: { id },
            data: { name, email, address },
        });
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update client' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.client.delete({ where: { id } });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete client' });
    }
});

export default router;
