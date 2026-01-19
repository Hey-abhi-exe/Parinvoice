import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import type { Invoice } from '../types';
import { Plus, FileText, TrendingUp, Users, DollarSign, Clock, ArrowUpRight, ArrowDownRight, Archive, Download } from 'lucide-react';

export default function Dashboard() {
    const { token } = useAuth();
    const { formatCurrency } = useSettings();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [recurringCount, setRecurringCount] = useState(0);

    useEffect(() => {
        fetchInvoices();
        fetchRecurring();
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/invoices', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setInvoices(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRecurring = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/recurring', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setRecurringCount(data.length);
        } catch (error) {
            console.error(error);
        }
    };

    const downloadAllInvoices = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/invoices/download-all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error(error);
            alert('Failed to download invoices');
        }
    };

    const totalRevenue = invoices.reduce((acc, curr) => acc + curr.total, 0);
    const pendingAmount = invoices.filter(i => i.status !== 'PAID').reduce((acc, curr) => acc + curr.total, 0);

    // Mock Chart Data (Visual Only)
    const chartBars = [40, 70, 45, 90, 60, 80, 50, 95, 65, 85, 75, 100];

    return (
        <Layout title="Command Center">
            {/* Top Stats Row */}
            <div className="grid-responsive" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <StatsCard
                    title="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                    change="+12.5%"
                    isPositive={true}
                    icon={<DollarSign size={20} color="white" />}
                    color="linear-gradient(135deg, var(--primary), var(--primary-dark))"
                />
                <StatsCard
                    title="Pending Payments"
                    value={formatCurrency(pendingAmount)}
                    change="-2.3%"
                    isPositive={false}
                    icon={<Clock size={20} color="white" />}
                    color="linear-gradient(135deg, var(--warning), #f59e0b)"
                />
                <StatsCard
                    title="Total Invoices"
                    value={invoices.length.toString()}
                    change="+5 New"
                    isPositive={true}
                    icon={<FileText size={20} color="white" />}
                    color="linear-gradient(135deg, var(--accent-cyan), #0891b2)"
                />
                <StatsCard
                    title="Recurring Active"
                    value={recurringCount.toString()}
                    change="Auto"
                    isPositive={true}
                    icon={<Archive size={20} color="white" />}
                    color="linear-gradient(135deg, #8b5cf6, #6d28d9)"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Revenue Chart Section */}
                <div className="glass-card" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Revenue Analytics</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Monthly revenue performance</p>
                        </div>
                        <select style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }}>
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>

                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', justifyContent: 'space-between' }}>
                        {chartBars.map((h, i) => (
                            <div key={i} style={{
                                width: '100%',
                                height: `${h}%`,
                                background: i === chartBars.length - 1 ? 'var(--primary)' : 'var(--border-light)',
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 0.3s ease'
                            }} className="hover-bar" />
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <span key={m}>{m}</span>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Activity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={18} color="var(--accent-cyan)" /> Quick Actions
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Link to="/invoices/new" className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', justifyContent: 'center' }}>
                                <Plus size={16} /> New Invoice
                            </Link>
                            <Link to="/clients/new" className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', justifyContent: 'center' }}>
                                <Users size={16} /> Add Client
                            </Link>
                            <button onClick={downloadAllInvoices} className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', justifyContent: 'center', cursor: 'pointer' }}>
                                <Download size={16} /> Download CSV
                            </button>
                            <Link to="/ai-generator" className="btn" style={{ background: 'linear-gradient(90deg, var(--accent-purple), var(--primary))', gridColumn: 'span 1', justifyContent: 'center', border: 'none', color: 'white' }}>
                                ✨ Ask AI
                            </Link>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {invoices.slice(0, 3).map(inv => (
                                <div key={inv.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {inv.client?.name.charAt(0)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>New Invoice for {inv.client?.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(inv.date).toLocaleDateString()}</div>
                                    </div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>${inv.total}</div>
                                </div>
                            ))}
                            {invoices.length === 0 && <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No recent activity</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function StatsCard({ title, value, change, isPositive, icon, color }: any) {
    return (
        <div className="glass-card glow-on-hover" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '700', margin: '0.25rem 0' }}>{value}</h3>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    {icon}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 500, color: isPositive ? 'var(--success)' : 'var(--danger)' }}>
                {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{change}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '0.25rem' }}>vs last month</span>
            </div>
        </div>
    );
}
