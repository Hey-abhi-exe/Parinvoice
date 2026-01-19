import { useState } from 'react';
import Layout from '../../components/Layout';
import { DollarSign, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SalaryCalculator() {
    const [salary, setSalary] = useState(75000);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [weeksPerYear, setWeeksPerYear] = useState(52);

    const hourly = salary / (hoursPerWeek * weeksPerYear);
    const daily = hourly * (hoursPerWeek / 5);
    const weekly = salary / weeksPerYear;
    const monthly = salary / 12;

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <Layout title="Salary to Hourly Calculator">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/tools" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
                        <ArrowLeft size={18} /> Back to Tools
                    </Link>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Convert your annual salary into hourly, daily, weekly, and monthly rates.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Inputs */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <DollarSign size={16} /> Annual Salary
                            </label>
                            <input
                                type="number"
                                value={salary}
                                onChange={e => setSalary(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <Clock size={16} /> Hours Per Week
                            </label>
                            <input
                                type="number"
                                value={hoursPerWeek}
                                onChange={e => setHoursPerWeek(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                                <Calendar size={16} /> Weeks Per Year
                            </label>
                            <input
                                type="number"
                                value={weeksPerYear}
                                onChange={e => setWeeksPerYear(Number(e.target.value))}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </div>

                    {/* Result */}
                    <div className="card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', padding: '2rem' }}>
                        <h3 style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '1.1rem' }}>Your Income Breakdown</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                <span style={{ color: '#94a3b8' }}>Hourly Rate</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22d3ee' }}>{formatMoney(hourly)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                <span style={{ color: '#94a3b8' }}>Daily Rate</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMoney(daily)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                <span style={{ color: '#94a3b8' }}>Weekly Pay</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMoney(weekly)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#94a3b8' }}>Monthly Pay</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMoney(monthly)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
