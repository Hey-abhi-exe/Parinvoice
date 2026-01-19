"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await db_1.prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
// Create product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, userId } = req.body;
        // In a real app, userId comes from auth token middleware.
        // For MVP/Demo without strict auth middleware yet, we accept it or fallback.
        let targetUserId = userId;
        if (!targetUserId) {
            const user = await db_1.prisma.user.findFirst();
            if (user)
                targetUserId = user.id;
        }
        if (!targetUserId) {
            return res.status(400).json({ error: "User ID required" });
        }
        const product = await db_1.prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                userId: targetUserId
            }
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
// Update product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const product = await db_1.prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: parseFloat(price)
            }
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.prisma.product.delete({ where: { id } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});
exports.default = router;
//# sourceMappingURL=products.js.map