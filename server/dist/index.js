"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const auth_1 = __importDefault(require("./routes/auth"));
const clients_1 = __importDefault(require("./routes/clients"));
const invoices_1 = __importDefault(require("./routes/invoices"));
const ai_1 = __importDefault(require("./routes/ai"));
const products_1 = __importDefault(require("./routes/products"));
const settings_1 = __importDefault(require("./routes/settings"));
const recurring_1 = __importDefault(require("./routes/recurring"));
const cron_1 = require("./cron");
const email_1 = __importDefault(require("./routes/email"));
app.use('/api/auth', auth_1.default);
app.use('/api/clients', clients_1.default);
app.use('/api/invoices', invoices_1.default);
app.use('/api/ai', ai_1.default);
app.use('/api/products', products_1.default);
app.use('/api/settings', settings_1.default);
app.use('/api/recurring', recurring_1.default);
app.use('/api/email', email_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.get('/', (req, res) => {
    res.send('Invoice SaaS Backend is Running');
});
// Start Cron Jobs
(0, cron_1.startCronJobs)();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map