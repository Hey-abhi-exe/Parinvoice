import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Save, CreditCard, Palette, FileText, User } from 'lucide-react';

export default function Settings() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Settings State
    const [currency, setCurrency] = useState('USD');
    const [taxRate, setTaxRate] = useState(0);
    const [taxLabel, setTaxLabel] = useState('Tax');
    const [logoUrl, setLogoUrl] = useState('');
    const [brandColor, setBrandColor] = useState('#2563eb');
    const [invoiceNote, setInvoiceNote] = useState('Thank you for your business!');

    // Profile State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchSettings();
        fetchProfile();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/settings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data) {
                    setCurrency(data.currency || 'USD');
                    setTaxRate(data.taxRate || 0);
                    setTaxLabel(data.taxLabel || 'Tax');
                    setLogoUrl(data.logoUrl || '');
                    setBrandColor(data.brandColor || '#2563eb');
                    setInvoiceNote(data.invoiceNote || '');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setName(data.name || '');
                setEmail(data.email || '');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setErrorMsg('');

        try {
            // Save Settings
            const settingsRes = await fetch('http://localhost:3001/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ currency, taxRate, taxLabel, logoUrl, brandColor, invoiceNote })
            });

            // Save Profile if changed
            if (name || newPassword) {
                const profileRes = await fetch('http://localhost:3001/api/auth/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ name, email, password: currentPassword, newPassword: newPassword || undefined })
                });

                if (!profileRes.ok) {
                    const err = await profileRes.json();
                    throw new Error(err.error || 'Failed to update profile');
                }
            }

            if (settingsRes.ok) {
                setSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Settings">
            <div style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* User Profile Section */}
                    <section className="card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={20} className="text-primary" /> Profile & Security
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                                <input value={email} disabled style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px', background: '#f1f5f9', cursor: 'not-allowed' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Change Password</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Password</label>
                                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Required to change" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>New Password</label>
                                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Leave blank to keep same" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Branding Section */}
                    <section className="card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Palette size={20} className="text-primary" /> Branding
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Brand Color</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="color" value={brandColor} onChange={e => setBrandColor(e.target.value)} style={{ height: '40px', width: '60px', padding: 0, border: 'none', cursor: 'pointer' }} />
                                    <input value={brandColor} onChange={e => setBrandColor(e.target.value)} style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Logo URL</label>
                                <input value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                            </div>
                        </div>
                    </section>

                    {/* Finance Section */}
                    <section className="card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={20} className="text-primary" /> Finance & Taxes
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Currency</label>
                                <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="INR">INR (₹)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tax Label</label>
                                <input value={taxLabel} onChange={e => setTaxLabel(e.target.value)} placeholder="e.g. VAT, GST" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tax Rate (%)</label>
                                <input type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                            </div>
                        </div>
                    </section>

                    {/* Invoices Section */}
                    <section className="card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={20} className="text-primary" /> Invoice Defaults
                        </h3>
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Default Footer Note</label>
                            <textarea rows={3} value={invoiceNote} onChange={e => setInvoiceNote(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px', fontFamily: 'inherit' }} />
                        </div>
                    </section>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem' }}>
                        <Save size={20} /> {loading ? 'Saving...' : 'Save All Changes'}
                    </button>

                    {success && <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', textAlign: 'center' }}>Settings saved successfully!</div>}
                    {errorMsg && <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', textAlign: 'center' }}>{errorMsg}</div>}
                </form>
            </div>
        </Layout>
    );
}
