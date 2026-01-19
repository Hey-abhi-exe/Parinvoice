import Layout from '../components/Layout';
import { Mail, MessageCircle, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Support() {
    const upiId = '7251090496@slc';
    const upiLink = `upi://pay?pa=${upiId}&pn=Parinvoice&cu=INR`;

    return (
        <Layout title="Support & Contact">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Contact Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail className="text-gradient" /> Email Support
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            For general inquiries and technical assistance.
                        </p>
                        <a href="mailto:parinvoice@gmail.com" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            parinvoice@gmail.com
                        </a>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <MessageCircle className="text-gradient-cyan" /> WhatsApp Support
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Chat with us directly for urgent queries.
                        </p>
                        <a href="https://wa.me/917251090496" target="_blank" rel="noreferrer" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                            Chat on WhatsApp
                        </a>
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            +91 7251090496
                        </div>
                    </div>
                </div>

                {/* UPI Payment */}
                <div className="glass-card" style={{ textAlign: 'center', border: '1px solid var(--accent-purple)' }}>
                    <div style={{
                        width: '64px', height: '64px', margin: '0 auto 1.5rem',
                        background: 'rgba(124, 58, 237, 0.1)', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <QrCode size={32} color="var(--accent-purple)" />
                    </div>
                    <h3 style={{ marginTop: 0 }}>Pay via UPI</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Scan to pay for subscription or services.
                    </p>

                    <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <QRCodeSVG value={upiLink} size={200} />
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '1rem' }}>
                        {upiId}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Parinvoice / Abhishek Verma
                    </p>
                </div>
            </div>
        </Layout>
    );
}
