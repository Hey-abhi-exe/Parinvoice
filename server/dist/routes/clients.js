"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.get('/', async (req, res) => {
    const userId = req.user.userId;
    try {
        const clients = await db_1.prisma.client.findMany({ where: { userId } });
        res.json(clients);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});
router.post('/', async (req, res) => {
    const userId = req.user.userId;
    const { name, email, address } = req.body;
    try {
        const client = await db_1.prisma.client.create({
            data: { userId, name, email, address },
        });
        res.json(client);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create client' });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;
    try {
        const client = await db_1.prisma.client.update({
            where: { id },
            data: { name, email, address },
        });
        res.json(client);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update client' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db_1.prisma.client.delete({ where: { id } });
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete client' });
    }
});
exports.default = router;
//# sourceMappingURL=clients.js.map