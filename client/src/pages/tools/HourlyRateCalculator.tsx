import { useState } from 'react';
import Layout from '../../components/Layout';
import { Calculator, ArrowLeft, DollarSign, Clock, Calendar, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HourlyRateCalculator() {
    const [income, setIncome] = useState(100000);
    const [hours, setHours] = useState(30);
    const [weeksOff, setWeeksOff] = useState(4);
    const [expenses, setExpenses] = useState(15000);

    const calculateRate = () => {
        const totalWeeks = 52 - weeksOff;
        const totalHours = totalWeeks * hours;
        const totalTarget = Number(income) + Number(expenses);
        if (totalHours <= 0) return 0;
        return totalTarget / totalHours;
    };

    const rate = calculateRate();

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Layout title="Hourly Rate Calculator">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/tools" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
                        <ArrowLeft size={18} /> Back to Tools
                    </Link>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Find out exactly how much you need to charge to hit your income goals.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Inputs */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <DollarSign size={16} /> Annual Income Goal
                            </label>
                            <input
                                type="number"
                                value={income}
                                onChange={e => setIncome(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Take-home pay you want.</p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <Briefcase size={16} /> Business Expenses (Yearly)
                            </label>
                            <input
                                type="number"
                                value={expenses}
                                onChange={e => setExpenses(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Software, insurance, equipment, etc.</p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <Clock size={16} /> Billable Hours (Per Week)
                            </label>
                            <input
                                type="number"
                                value={hours}
                                onChange={e => setHours(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Hours actually spent working for clients.</p>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <Calendar size={16} /> Weeks Off (Per Year)
                            </label>
                            <input
                                type="number"
                                value={weeksOff}
                                onChange={e => setWeeksOff(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Vacation, holidays, and sick days.</p>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', textAlign: 'center', padding: '3rem 2rem' }}>
                        <Calculator size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#94a3b8' }}>Your Minimum Hourly Rate</h3>
                        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '1rem 0', color: '#22d3ee' }}>
                            {formatMoney(rate)}
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                            To earn <strong>{formatMoney(Number(income))}</strong>/year with <strong>{expenses > 0 ? formatMoney(expenses) : 'no'}</strong> expenses, working <strong>{hours}</strong> billable hours/week.
                        </p>

                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Weekly Target</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{formatMoney(rate * hours)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Monthly Target</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{formatMoney((rate * hours * (52 - weeksOff)) / 12)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
