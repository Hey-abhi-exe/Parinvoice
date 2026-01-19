import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import type { Client } from '../types';
import { Plus, Trash2, Mail, MapPin } from 'lucide-react';

export default function Clients() {
    const { token } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', email: '', address: '' });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const res = await fetch('http://localhost:3001/api/clients', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setClients(await res.json());
    };

    const createClient = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newClient)
            });
            if (res.ok) {
                setNewClient({ name: '', email: '', address: '' });
                setShowForm(false);
                fetchClients();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const deleteClient = async (id: string) => {
        if (!confirm('Delete this client?')) return;
        await fetch(`http://localhost:3001/api/clients/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        setClients(clients.filter(c => c.id !== id));
    };

    return (
        <Layout title="Clients">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    <Plus size={20} /> Add New Client
                </button>
            </div>

            {showForm && (
                <div className="card animate-fade-in" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Client</h3>
                    <form onSubmit={createClient} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Client Name</label>
                            <input placeholder="e.g. Acme Corp" required value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                            <input placeholder="contact@acme.com" type="email" required value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Billing Address</label>
                            <input placeholder="123 Business Rd..." value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Client</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {clients.map(client => (
                    <div key={client.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                    {client.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{client.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>ID: #{client.id.slice(0, 6)}</div>
                                </div>
                            </div>
                            <button onClick={() => deleteClient(client.id)} style={{ color: 'var(--text-secondary)', padding: '0.5rem' }}>
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <Mail size={16} /> {client.email}
                            </div>
                            {client.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <MapPin size={16} /> {client.address}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {clients.length === 0 && !showForm && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem' }}>
                    No clients yet. Click "Add New Client" to get started.
                </div>
            )}
        </Layout>
    );
}
