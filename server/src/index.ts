import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth';
import clientRoutes from './routes/clients';
import invoiceRoutes from './routes/invoices';

import aiRoutes from './routes/ai';
import productRoutes from './routes/products';
import settingsRoutes from './routes/settings';

import recurringRoutes from './routes/recurring';
import { startCronJobs } from './cron';

import emailRoutes from './routes/email';

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/products', productRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/recurring', recurringRoutes);
app.use('/api/email', emailRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Invoice SaaS Backend is Running');
});

// Start Cron Jobs
startCronJobs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
