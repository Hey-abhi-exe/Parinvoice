"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
// Create reusable transporter object using the default SMTP transport
// For testing, we can use Ethereal, or just log to console if no env vars
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'ethereal_user',
        pass: process.env.SMTP_PASS || 'ethereal_pass',
    },
});
router.post('/invoice/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const invoice = await db_1.prisma.invoice.findUnique({
            where: { id },
            include: { client: true, items: true, user: true }
        });
        if (!invoice)
            return res.status(404).json({ error: 'Invoice not found' });
        if (invoice.userId !== userId)
            return res.status(403).json({ error: 'Unauthorized' });
        if (!invoice.client || !invoice.client.email)
            return res.status(400).json({ error: 'Client has no email address' });
        // Simple HTML Email Template
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h2>Invoice #${invoice.invoiceNumber || invoice.id.slice(0, 8)}</h2>
                <p>Hello ${invoice.client.name},</p>
                <p>Here is your invoice from ${invoice.user.companyName || invoice.user.name || 'Us'}.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background: #f3f4f6; text-align: left;">
                        <th style="padding: 10px;">Item</th>
                        <th style="padding: 10px; text-align: right;">Cost</th>
                    </tr>
                    ${invoice.items.map((item) => `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                ${item.description} x ${item.quantity}
                            </td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                                ${item.total.toFixed(2)}
                            </td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td style="padding: 10px; font-weight: bold;">Total</td>
                        <td style="padding: 10px; font-weight: bold; text-align: right;">
                            ${invoice.total.toFixed(2)}
                        </td>
                    </tr>
                </table>

                <p>Please pay by ${invoice.dueDate ? new Date(invoice.dueDate).toDateString() : 'the due date'}.</p>
                <p>Thank you!</p>
            </div>
        `;
        const info = await transporter.sendMail({
            from: `"${invoice.user.name || 'Invoice App'}" <${process.env.SMTP_FROM || 'noreply@example.com'}>`,
            to: invoice.client.email,
            subject: `Invoice from ${invoice.user.companyName || invoice.user.name}`,
            html: html,
        });
        console.log("Message sent: %s", info.messageId);
        // Update status to SENT if it was DRAFT
        if (invoice.status === 'DRAFT') {
            await db_1.prisma.invoice.update({
                where: { id },
                data: { status: 'SENT' }
            });
        }
        res.json({ message: 'Email sent successfully', messageId: info.messageId });
    }
    catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
exports.default = router;
//# sourceMappingURL=email.js.map