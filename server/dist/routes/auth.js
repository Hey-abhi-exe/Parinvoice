"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const router = (0, express_1.Router)();
const SECRET = process.env.JWT_SECRET || 'secret';
// Register
router.post('/register', async (req, res) => {
    const { email, password, name, companyName } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.prisma.user.create({
            data: { email, password: hashedPassword, name, companyName },
        });
        // Return token immediately for convenience
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName } });
    }
    catch (err) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName } });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
// Get Current User
const auth_1 = require("../middleware/auth");
router.get('/me', auth_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({ id: user.id, email: user.email, name: user.name, companyName: user.companyName });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
});
// Update Profile & Password
router.put('/profile', auth_1.authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { name, email, password, newPassword } = req.body;
    try {
        const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const data = { name, email };
        if (newPassword) {
            // Verify old password if provided
            if (password && !(await bcryptjs_1.default.compare(password, user.password))) {
                return res.status(400).json({ error: 'Invalid current password' });
            }
            // If they are just setting it directly (simple mode) or verified
            data.password = await bcryptjs_1.default.hash(newPassword, 10);
        }
        const updatedUser = await db_1.prisma.user.update({
            where: { id: userId },
            data
        });
        res.json({ id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, companyName: updatedUser.companyName });
    }
    catch (err) {
        res.status(500).json({ error: 'Update failed' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map