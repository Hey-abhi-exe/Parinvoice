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
        const invoices = await db_1.prisma.invoice.findMany({
            where: { userId },
            include: { client: true, items: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(invoices);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});
router.get('/download-all', async (req, res) => {
    const userId = req.user.userId;
    try {
        const invoices = await db_1.prisma.invoice.findMany({
            where: { userId },
            include: { client: true, items: true },
            orderBy: { createdAt: 'desc' }
        });
        const headers = ['Invoice Number', 'Client Name', 'Date', 'Due Date', 'Total', 'Status', 'Items Count'];
        const rows = invoices.map(inv => [
            inv.id.substring(0, 8).toUpperCase(), // specific ID format usually preferred
            inv.client?.name || 'Unknown',
            new Date(inv.date).toISOString().split('T')[0],
            inv.dueDate ? new Date(inv.dueDate).toISOString().split('T')[0] : '',
            inv.total,
            inv.status,
            inv.items.length
        ]);
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(field => `"${field}"`).join(','))
        ].join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="invoices.csv"');
        res.send(csvContent);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to download invoices' });
    }
});
router.post('/', async (req, res) => {
    const userId = req.user.userId;
    const { clientId, date, dueDate, items, total, status, subtotal, taxRate, taxAmount, discount } = req.body;
    try {
        const invoice = await db_1.prisma.invoice.create({
            data: {
                userId,
                clientId,
                date: new Date(date),
                dueDate: dueDate ? new Date(dueDate) : null,
                total,
                subtotal: subtotal || 0,
                taxRate: taxRate || 0,
                taxAmount: taxAmount || 0,
                discount: discount || 0,
                status: status || 'DRAFT',
                items: {
                    create: items.map((item) => ({
                        productId: item.productId || null,
                        description: item.description,
                        quantity: Number(item.quantity),
                        price: Number(item.price),
                        total: Number(item.quantity) * Number(item.price)
                    }))
                }
            },
            include: { items: true }
        });
        res.json(invoice);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await db_1.prisma.invoice.findUnique({
            where: { id },
            include: { client: true, items: true },
        });
        if (!invoice)
            return res.status(404).json({ error: 'Not found' });
        res.json(invoice);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, items, total, date, dueDate, subtotal, taxRate, taxAmount, discount } = req.body;
    try {
        // Delete existing items first to replace them
        await db_1.prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });
        const invoice = await db_1.prisma.invoice.update({
            where: { id },
            data: {
                status,
                total,
                subtotal: subtotal || 0,
                taxRate: taxRate || 0,
                taxAmount: taxAmount || 0,
                discount: discount || 0,
                date: date ? new Date(date) : undefined,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                items: items ? {
                    create: items.map((item) => ({
                        productId: item.productId || null,
                        description: item.description,
                        quantity: Number(item.quantity),
                        price: Number(item.price),
                        total: Number(item.quantity) * Number(item.price)
                    }))
                } : undefined
            },
            include: { items: true }
        });
        res.json(invoice);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db_1.prisma.invoice.delete({ where: { id } });
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});
exports.default = router;
//# sourceMappingURL=invoices.js.map