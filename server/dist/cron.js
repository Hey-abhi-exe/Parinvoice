"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./db");
const startCronJobs = () => {
    // Check every minute
    node_cron_1.default.schedule('* * * * *', async () => {
        console.log('Running recurring invoice check...');
        const now = new Date();
        try {
            // Find ACTIVE profiles where nextRun <= now
            const profiles = await db_1.prisma.recurringProfile.findMany({
                where: {
                    status: 'ACTIVE',
                    nextRun: { lte: now }
                }
            });
            for (const profile of profiles) {
                // Create Invoice
                const invoice = await db_1.prisma.invoice.create({
                    data: {
                        userId: profile.userId,
                        clientId: profile.clientId,
                        status: 'DRAFT', // Or SENT, based on preference
                        date: new Date(),
                        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Default 14 days due
                        total: profile.total,
                        items: {
                            create: JSON.parse(profile.items).map((item) => ({
                                description: item.description,
                                quantity: Number(item.quantity),
                                price: Number(item.price),
                                total: Number(item.quantity) * Number(item.price)
                            }))
                        }
                    }
                });
                console.log(`Generated invoice ${invoice.id} for profile ${profile.id}`);
                // Update nextRun using a simple monthly increment for now
                // In a real app, parse cronSchedule to get actual next date
                // For simplicity MVP: assuming monthly
                const nextDate = new Date(profile.nextRun);
                nextDate.setMonth(nextDate.getMonth() + 1);
                await db_1.prisma.recurringProfile.update({
                    where: { id: profile.id },
                    data: {
                        lastRun: new Date(),
                        nextRun: nextDate
                    }
                });
            }
        }
        catch (error) {
            console.error('Cron job error:', error);
        }
    });
};
exports.startCronJobs = startCronJobs;
//# sourceMappingURL=cron.js.map