import Layout from '../components/Layout';
import { Calculator, Clock, FileText, QrCode, DollarSign, Percent, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Tools() {
    const tools = [
        { icon: <FileText color="var(--primary)" />, title: 'Invoice Generator', desc: 'Create professional invoices instantly.' },
        { icon: <Briefcase color="var(--accent-purple)" />, title: 'Business Name Gen', desc: 'Find the perfect name for your startup.', path: '#' },
        { icon: <Calculator color="var(--success)" />, title: 'Hourly Rate Calc', desc: 'Calculate your ideal freelancer rate.', path: '/tools/hourly-rate' },
        { icon: <Clock color="var(--warning)" />, title: 'Time Tracker', desc: 'Track billable hours effortlessly.', path: '#' },
        { icon: <Percent color="var(--danger)" />, title: 'Profit Margin Calc', desc: 'Determine your product margins.', path: '/tools/profit-margin' },
        { icon: <QrCode color="var(--text-primary)" />, title: 'QR Code Gen', desc: 'Generate QR codes for payments.', path: '#' },
        { icon: <DollarSign color="var(--accent-cyan)" />, title: 'Salary Calculator', desc: 'Convert annual salary to hourly.', path: '/tools/salary' },
        { icon: <FileText color="var(--primary-light)" />, title: 'Receipt Maker', desc: 'Generate custom receipts.' },
    ];

    return (
        <Layout title="Free Business Tools">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Grow Your Business</h2>
                <p style={{ color: 'var(--text-secondary)' }}>A collection of free tools to help you manage your finances.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {tools.map((tool, i) => (
                    <Link to={tool.path || '#'} key={i} className="glass-card glow-on-hover" style={{ cursor: 'pointer', textDecoration: 'none', display: 'block', color: 'inherit' }}>
                        <div style={{ marginBottom: '1rem', background: 'var(--bg-secondary)', width: 'fit-content', padding: '0.75rem', borderRadius: '12px' }}>
                            {tool.icon}
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{tool.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tool.desc}</p>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
