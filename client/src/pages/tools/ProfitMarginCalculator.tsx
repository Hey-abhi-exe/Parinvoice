import { useState } from 'react';
import Layout from '../../components/Layout';
import { ArrowLeft, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfitMarginCalculator() {
    const [cost, setCost] = useState(50);
    const [price, setPrice] = useState(100);

    const profit = price - cost;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const markup = cost > 0 ? (profit / cost) * 100 : 0;

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Layout title="Profit Margin Calculator">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/tools" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
                        <ArrowLeft size={18} /> Back to Tools
                    </Link>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Determine the profitability of your products or services.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Inputs */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <DollarSign size={16} /> Cost of Goods (COG)
                            </label>
                            <input
                                type="number"
                                value={cost}
                                onChange={e => setCost(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Cost to produce or acquire the item.</p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <DollarSign size={16} /> Selling Price
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Price you charge the customer.</p>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', textAlign: 'center', padding: '3rem 2rem' }}>
                        <TrendingUp size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#94a3b8' }}>Gross Profit Margin</h3>
                        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '1rem 0', color: '#22d3ee' }}>
                            {margin.toFixed(2)}%
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Net Profit</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4ade80' }}>
                                    {formatMoney(profit)}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Markup</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                    {markup.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
