import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
    return (
        <div style={{ padding: '4rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>&larr; Back to Home</Link>

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Pricing</span>
                <h1 style={{ fontSize: '3rem', marginTop: '1rem' }}>Simple, <span className="text-gradient">transparent pricing</span></h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>Start free. Scale when you're ready.</p>
            </div>

            <div className="grid-responsive" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <PricingCard
                    title="Free"
                    price="₹0"
                    period="/month"
                    features={['Unlimited invoices', 'Basic templates', 'Email support', 'Payment tracking']}
                    btnText="Start Free"
                    link="/register"
                />
                <PricingCard
                    title="Pro"
                    price="₹99"
                    period="/month"
                    features={['Unlimited invoices', 'AI invoice generation', 'Priority support', 'Advanced analytics', 'Custom branding']}
                    btnText="Get Started"
                    link="/register"
                    gradient={true}
                />
                <PricingCard
                    title="Enterprise"
                    price="₹199"
                    period="/month"
                    features={['Everything in Pro', 'Team collaboration', 'API access', 'Dedicated account manager', 'Custom integrations']}
                    btnText="Contact Sales"
                    link="/support"
                />
            </div>
        </div>
    );
}

function PricingCard({ title, price, period, features, btnText, link, gradient = false }: any) {
    return (
        <div className="glass-card" style={{
            padding: '2.5rem',
            borderRadius: '24px',
            position: 'relative',
            background: gradient ? 'linear-gradient(135deg, white, #f0fdf4)' : 'white',
            border: gradient ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
            transform: gradient ? 'scale(1.05)' : 'none',
            zIndex: gradient ? 2 : 1
        }}>
            {gradient && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    MOST POPULAR
                </div>
            )}
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {price}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>{period}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Per user, billed monthly</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {features.map((feature: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle size={18} color="var(--success)" />
                        <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{feature}</span>
                    </div>
                ))}
            </div>

            <Link to={link || "#"} className={`btn ${gradient ? 'btn-primary' : ''}`} style={{
                width: '100%',
                display: 'block',
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '12px',
                background: gradient ? undefined : 'var(--bg-secondary)',
                color: gradient ? undefined : 'var(--text-primary)'
            }}>
                {btnText}
            </Link>
        </div>
    );
}
