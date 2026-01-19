import { Zap, Sparkles, ShieldCheck, PieChart, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
    return (
        <div style={{ padding: '4rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>&larr; Back to Home</Link>

            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Features</span>
                <h1 style={{ fontSize: '3rem', marginTop: '1rem' }}>Everything you need to <span className="text-gradient">succeed</span></h1>
            </div>

            <div className="grid-responsive">
                <FeatureCard icon={<Zap size={32} color="var(--accent-cyan)" />} title="Instant Invoicing" desc="Create beautiful invoices in seconds. Not minutes." emoji="⚡" />
                <FeatureCard icon={<Sparkles size={32} color="var(--accent-purple)" />} title="AI Superpowers" desc="Let Gemini AI write your emails and categorize expenses." emoji="🧠" />
                <FeatureCard icon={<ShieldCheck size={32} color="var(--success)" />} title="Bank-Grade Security" desc="Your financial data is encrypted and safe with us." emoji="🔒" />
                <FeatureCard icon={<PieChart size={32} color="#f59e0b" />} title="Financial Insights" desc="Know exactly where your money is going." emoji="📊" />
                <FeatureCard icon={<Users size={32} color="#ec4899" />} title="Client Portal" desc="Give clients a professional dashboard to pay you." emoji="🤝" />
                <FeatureCard icon={<MessageSquare size={32} color="var(--primary)" />} title="24/7 Support" desc="Real humans (and smart bots) here to help." emoji="💬" />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, emoji }: any) {
    return (
        <div className="glass-card glow-on-hover" style={{ padding: '2rem', transition: 'transform 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--bg-secondary)' }}>{icon}</div>
                <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
        </div>
    );
}
