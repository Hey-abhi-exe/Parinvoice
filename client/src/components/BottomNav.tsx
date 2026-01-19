import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sparkles, FileText, Menu, Plus } from 'lucide-react';

export default function BottomNav() {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0.75rem 0',
            zIndex: 50,
        }} className="mobile-only-nav">
            <Link to="/dashboard" style={{ color: isActive('/dashboard') ? 'var(--primary)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', textDecoration: 'none' }}>
                <LayoutDashboard size={24} />
                <span style={{ marginTop: '4px' }}>Home</span>
            </Link>

            <Link to="/ai-generator" style={{ color: isActive('/ai-generator') ? 'var(--accent-purple)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', textDecoration: 'none' }}>
                <Sparkles size={24} />
                <span style={{ marginTop: '4px' }}>AI Gen</span>
            </Link>

            <div style={{ position: 'relative', top: '-24px' }}>
                <Link to="/invoices/new" style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)'
                }}>
                    <Plus size={24} />
                </Link>
            </div>

            <Link to="/invoices" style={{ color: isActive('/invoices') ? 'var(--primary)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', textDecoration: 'none' }}>
                <FileText size={24} />
                <span style={{ marginTop: '4px' }}>Invoices</span>
            </Link>

            <Link to="/settings" style={{ color: isActive('/settings') ? 'var(--primary)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.75rem', textDecoration: 'none' }}>
                <Menu size={24} />
                <span style={{ marginTop: '4px' }}>Menu</span>
            </Link>
        </div>
    );
}

// Add strict CSS for mobile-only visibility to index.css if not present, or use inline style hack
// Since inline psuedo-elements don't work in React, we'll rely on a CSS class or media query in index.css
