import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import type { Client, Invoice, InvoiceItem, Product } from '../types';
import { Plus, Trash2, ArrowLeft, Save, Download, Calendar, User, Mail } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from '../components/InvoicePDF';

export default function InvoiceEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { settings, formatCurrency } = useSettings();
    const [loading, setLoading] = useState(false);

    const [clients, setClients] = useState<Client[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedClientId, setSelectedClientId] = useState('');

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('DRAFT');

    const [items, setItems] = useState<InvoiceItem[]>([{ description: '', quantity: 1, price: 0 }]);
    const [taxRate, setTaxRate] = useState(settings.taxRate || 0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        fetchClients();
        fetchProducts();
        if (id) fetchInvoice(id);
    }, [id]);

    useEffect(() => {
        // Set default tax from settings if new invoice
        if (!id && settings.taxRate) setTaxRate(settings.taxRate);
    }, [settings.taxRate, id]);

    const fetchClients = async () => {
        const res = await fetch('http://localhost:3001/api/clients', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setClients(await res.json());
    };

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:3001/api/products', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setProducts(await res.json());
    };

    const fetchInvoice = async (invoiceId: string) => {
        const res = await fetch(`http://localhost:3001/api/invoices/${invoiceId}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
            const data: Invoice = await res.json();
            setSelectedClientId(data.clientId);
            setDate(data.date.split('T')[0]);
            if (data.dueDate) setDueDate(data.dueDate.split('T')[0]);
            setStatus(data.status);
            setItems(data.items);
            if (data.taxRate !== undefined) setTaxRate(data.taxRate);
            if (data.discount !== undefined) setDiscount(data.discount);
        }
    };

    const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0 }]);

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items];
        const item = { ...newItems[index] };

        if (field === 'productId') {
            const product = products.find(p => p.id === value);
            if (product) {
                item.productId = product.id;
                item.description = product.name; // Keep simple for now
                item.price = product.price;
            } else {
                item.productId = undefined;
            }
        } else {
            (item as any)[field] = value;
        }
        newItems[index] = item;
        setItems(newItems);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount - discount;

    const saveInvoice = async () => {
        if (!selectedClientId) return alert('Please select a client');
        setLoading(true);
        const payload = {
            clientId: selectedClientId,
            date,
            dueDate,
            status,
            items,
            subtotal,
            taxRate,
            taxAmount,
            discount,
            total
        };

        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `http://localhost:3001/api/invoices/${id}` : 'http://localhost:3001/api/invoices';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            if (res.ok) navigate('/dashboard');
            else alert('Failed to save');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/api/email/invoice/${id}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) alert('Email sent successfully!');
            else alert('Failed to send email.');
        } catch (e) {
            console.error(e);
            alert('Error sending email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title={id ? 'Edit Invoice' : 'New Invoice'}>
            <div style={{ marginBottom: '2rem' }}>
                <button onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem' }}>
                {/* Left Column: Editor */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Header Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                <User size={14} /> Client
                            </label>
                            <select
                                value={selectedClientId}
                                onChange={(e) => setSelectedClientId(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem' }}
                            >
                                <option value="">Select Client</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                Status
                            </label>
                            <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '0.75rem' }}>
                                <option value="DRAFT">Draft</option>
                                <option value="SENT">Sent</option>
                                <option value="PAID">Paid</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                <Calendar size={14} /> Date
                            </label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                <Calendar size={14} /> Due Date
                            </label>
                            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                        </div>
                    </div>

                    <hr style={{ borderColor: 'var(--border)', margin: 0, opacity: 0.5 }} />

                    {/* Items Table */}
                    <div>
                        <h3 style={{ marginTop: 0, fontSize: '1.125rem', marginBottom: '1rem' }}>Items</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 80px 100px 40px', gap: '1rem', padding: '0 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                <div>PRODUCT (OPTIONAL)</div>
                                <div>DESCRIPTION</div>
                                <div>QTY</div>
                                <div>PRICE</div>
                                <div></div>
                            </div>

                            {items.map((item, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 80px 100px 40px', gap: '1rem', alignItems: 'start' }}>
                                    <select
                                        value={item.productId || ''}
                                        onChange={e => updateItem(i, 'productId', e.target.value)}
                                        style={{ backgroundColor: '#f8fafc', padding: '0.5rem', fontSize: '0.875rem' }}
                                    >
                                        <option value="">Custom Item</option>
                                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                    <input
                                        placeholder="Item description"
                                        value={item.description}
                                        onChange={e => updateItem(i, 'description', e.target.value)}
                                        style={{ backgroundColor: '#f8fafc' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={item.quantity}
                                        onChange={e => updateItem(i, 'quantity', parseFloat(e.target.value))}
                                        style={{ backgroundColor: '#f8fafc' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={item.price}
                                        onChange={e => updateItem(i, 'price', parseFloat(e.target.value))}
                                        style={{ backgroundColor: '#f8fafc' }}
                                    />
                                    <button onClick={() => removeItem(i)} style={{ color: 'var(--text-secondary)', padding: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addItem} className="btn" style={{ marginTop: '1rem', width: '100%', border: '1px dashed var(--border)', color: 'var(--text-secondary)' }}>
                            <Plus size={16} /> Add Item
                        </button>
                    </div>
                </div>

                {/* Right Column: Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h3 style={{ marginTop: 0, fontSize: '1.125rem' }}>Summary</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{settings.taxLabel || 'Tax'} Rate (%)</span>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={e => setTaxRate(parseFloat(e.target.value))}
                                    style={{ width: '60px', padding: '0.25rem', textAlign: 'right' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Tax Amount</span>
                                <span>{formatCurrency(taxAmount)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Discount</span>
                                <input
                                    type="number"
                                    value={discount}
                                    onChange={e => setDiscount(parseFloat(e.target.value))}
                                    style={{ width: '80px', padding: '0.25rem', textAlign: 'right' }}
                                />
                            </div>

                            <hr style={{ borderColor: 'var(--border)', margin: '0.5rem 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Total</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button onClick={saveInvoice} disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
                                <Save size={20} /> {loading ? 'Saving...' : 'Save Invoice'}
                            </button>

                            {id && selectedClientId && (
                                <PDFDownloadLink
                                    document={
                                        <InvoicePDF invoice={{
                                            id: id,
                                            userId: '',
                                            clientId: selectedClientId,
                                            client: clients.find(c => c.id === selectedClientId),
                                            date,
                                            dueDate: dueDate || undefined,
                                            status: status as any,
                                            items,
                                            subtotal,
                                            taxRate,
                                            taxAmount,
                                            discount,
                                            total,
                                            createdAt: ''
                                        }} />
                                    }
                                    fileName={`invoice-${id}.pdf`}
                                    className="btn btn-secondary"
                                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}
                                >
                                    {({ loading }) => (
                                        <>
                                            <Download size={20} style={{ marginRight: '0.5rem' }} />
                                            {loading ? 'Generating...' : 'Download PDF'}
                                        </>
                                    )}
                                </PDFDownloadLink>
                            )}

                            {id && (
                                <button onClick={sendEmail} disabled={loading} className="btn btn-secondary" style={{ width: '100%', padding: '0.875rem' }}>
                                    <Mail size={20} style={{ marginRight: '0.5rem' }} /> Email Invoice
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


