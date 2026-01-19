import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit2, Play, Pause } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import type { Client, Product } from '../types';

interface RecurringProfile {
    id: string;
    clientId: string;
    client?: Client;
    name: string;
    cronSchedule: string;
    nextRun: string;
    status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
    items: string; // JSON
    total: number;
}

export default function RecurringInvoices() {
    const { token } = useAuth();
    const { formatCurrency } = useSettings();
    const [profiles, setProfiles] = useState<RecurringProfile[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [frequency, setFrequency] = useState('0 0 1 * *'); // Default Monthly
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [items, setItems] = useState([{ description: '', quantity: 1, price: 0, productId: '' }]);

    const frequencies = [
        { label: 'Daily', value: '0 0 * * *' },
        { label: 'Weekly', value: '0 0 * * 1' },
        { label: 'Monthly (1st)', value: '0 0 1 * *' },
        { label: 'Yearly (Jan 1st)', value: '0 0 1 1 *' }
    ];

    useEffect(() => {
        fetchProfiles();
        fetchClients();
        fetchProducts();
    }, []);

    const fetchProfiles = async () => {
        const res = await fetch('http://localhost:3001/api/recurring', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setProfiles(await res.json());
    };

    const fetchClients = async () => {
        const res = await fetch('http://localhost:3001/api/clients', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setClients(await res.json());
    };

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:3001/api/products', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setProducts(await res.json());
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const payload = {
            name,
            clientId,
            cronSchedule: frequency,
            nextRun: new Date(startDate).toISOString(), // Simplified next run logic
            items,
            total,
            status: 'ACTIVE'
        };

        const url = editingId ? `http://localhost:3001/api/recurring/${editingId}` : 'http://localhost:3001/api/recurring';
        const method = editingId ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            fetchProfiles();
            closeModal();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this recurring profile?')) return;
        await fetch(`http://localhost:3001/api/recurring/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchProfiles();
    };

    const toggleStatus = async (profile: RecurringProfile) => {
        const newStatus = profile.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        await fetch(`http://localhost:3001/api/recurring/${profile.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: newStatus })
        });
        fetchProfiles();
    };

    const openModal = (profile?: RecurringProfile) => {
        if (profile) {
            setEditingId(profile.id);
            setName(profile.name || '');
            setClientId(profile.clientId);
            setFrequency(profile.cronSchedule);
            setStartDate(new Date(profile.nextRun).toISOString().split('T')[0]);
            setItems(JSON.parse(profile.items));
        } else {
            setEditingId(null);
            setName('');
            setClientId('');
            setFrequency('0 0 1 * *');
            setStartDate(new Date().toISOString().split('T')[0]);
            setItems([{ description: '', quantity: 1, price: 0, productId: '' }]);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...items];
        const item = { ...newItems[index] };

        if (field === 'productId') {
            const p = products.find(prod => prod.id === value);
            if (p) {
                item.productId = p.id;
                item.description = p.name;
                item.price = p.price;
            } else {
                item.productId = '';
            }
        } else {
            (item as any)[field] = value;
        }
        newItems[index] = item;
        setItems(newItems);
    };

    return (
        <Layout title="Recurring Invoices">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Automate invoices for repeat clients.</p>
                <button onClick={() => openModal()} className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> New Recurring Profile
                </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem' }}>Client</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem' }}>Frequency</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem' }}>Next Run</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem' }}>Total</th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{p.name}</td>
                                <td style={{ padding: '1rem' }}>{p.client?.name}</td>
                                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>{frequencies.find(f => f.value === p.cronSchedule)?.label || p.cronSchedule}</td>
                                <td style={{ padding: '1rem' }}>{new Date(p.nextRun).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                                        backgroundColor: p.status === 'ACTIVE' ? '#dcfce7' : '#f1f5f9',
                                        color: p.status === 'ACTIVE' ? '#166534' : '#64748b'
                                    }}>
                                        {p.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(p.total)}</td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button onClick={() => toggleStatus(p)} style={{ marginRight: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                                        {p.status === 'ACTIVE' ? <Pause size={16} /> : <Play size={16} />}
                                    </button>
                                    <button onClick={() => openModal(p)} style={{ marginRight: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="card" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginTop: 0 }}>{editingId ? 'Edit Profile' : 'New Recurring Profile'}</h2>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Name</label>
                                    <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Monthly Retainer" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                                </div>
                                <div>
                                    <label>Client</label>
                                    <select required value={clientId} onChange={e => setClientId(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                        <option value="">Select Client</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Frequency</label>
                                    <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                        {frequencies.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label>Start / Next Run</label>
                                    <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '6px' }} />
                                </div>
                            </div>

                            <hr style={{ borderColor: 'var(--border)', margin: '0.5rem 0' }} />

                            <h4>Items</h4>
                            {items.map((item, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 80px 80px 30px', gap: '0.5rem', alignItems: 'center' }}>
                                    <select value={item.productId} onChange={e => updateItem(i, 'productId', e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)' }}>
                                        <option value="">Custom</option>
                                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                    <input placeholder="Desc" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)' }} />
                                    <input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(i, 'quantity', Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)' }} />
                                    <input type="number" placeholder="Price" value={item.price} onChange={e => updateItem(i, 'price', Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)' }} />
                                    <button type="button" onClick={() => setItems(items.filter((_, idx) => idx !== i))} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => setItems([...items, { description: '', quantity: 1, price: 0, productId: '' }])} className="btn" style={{ border: '1px dashed var(--border)' }}>+ Add Item</button>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={closeModal} className="btn">Cancel</button>
                                <button type="submit" disabled={loading} className="btn btn-primary">Save Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
