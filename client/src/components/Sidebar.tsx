import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Users, Package, BarChart3, Settings, LogOut, Sparkles, Wrench, HelpCircle, Archive } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Sparkles size={20} />, label: 'AI Generator', path: '/ai-generator' },
        { icon: <FilePlus size={20} />, label: 'Create Invoice', path: '/invoices/new' },
        { icon: <Archive size={20} />, label: 'Recurring', path: '/recurring' },
        { icon: <Users size={20} />, label: 'Clients', path: '/clients' },
        { icon: <Package size={20} />, label: 'Products', path: '/products' },
        { icon: <BarChart3 size={20} />, label: 'Reports', path: '/reports' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
        { icon: <Wrench size={20} />, label: 'Free Tools', path: '/tools' },
        { icon: <HelpCircle size={20} />, label: 'Support', path: '/support' },
    ];

    return (
        <aside style={{
            width: '280px',
            backgroundColor: '#1e293b', /* Solid bg, no gradient */
            color: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            height: '100vh',
            left: 0,
            top: 0,
            zIndex: 50,
            overflow: 'hidden',
            borderRight: '1px solid rgba(255,255,255,0.05)'
        }} className="desktop-only-sidebar">
            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>P</div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Parinvoice</span>
                </Link>
            </div>

            <nav style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '1rem', fontWeight: '600', letterSpacing: '0.05em' }}>Menu</div>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: isActive(item.path) ? '#22d3ee' : '#94a3b8',
                            backgroundColor: isActive(item.path) ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                            transition: 'all 0.2s',
                            fontWeight: isActive(item.path) ? 600 : 500
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive(item.path)) {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive(item.path)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={logout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        color: '#ef4444',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
