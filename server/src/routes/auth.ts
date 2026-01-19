import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'secret';

// Register
router.post('/register', async (req, res) => {
    const { email, password, name, companyName } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name, companyName },
        });
        // Return token immediately for convenience
        const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName } });
    } catch (err) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get Current User
import { authenticateToken } from '../middleware/auth';
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userId = (req as any).user.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ id: user.id, email: user.email, name: user.name, companyName: user.companyName });
    } catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
});

// Update Profile & Password
router.put('/profile', authenticateToken, async (req, res) => {
    const userId = (req as any).user.userId;
    const { name, email, password, newPassword } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const data: any = { name, email };

        if (newPassword) {
            // Verify old password if provided
            if (password && !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ error: 'Invalid current password' });
            }
            // If they are just setting it directly (simple mode) or verified
            data.password = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data
        });

        res.json({ id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, companyName: updatedUser.companyName });
    } catch (err) {
        res.status(500).json({ error: 'Update failed' });
    }
});

export default router;
