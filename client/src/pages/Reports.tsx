import Layout from '../components/Layout';
import { BarChart3 } from 'lucide-react';

export default function Reports() {
    return (
        <Layout title="Reports">
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{
                    width: '64px', height: '64px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <BarChart3 size={32} color="var(--success)" />
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Analytics & Reports</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                    Gain insights into your revenue and client performance. Detailed reports are coming soon!
                </p>
            </div>
        </Layout>
    );
}
