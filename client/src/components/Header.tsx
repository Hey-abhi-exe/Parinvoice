import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ title }: { title: string }) {
    const { user } = useAuth();

    return (
        <header style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 40
        }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{title}</h1>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        placeholder="Search..."
                        style={{
                            paddingLeft: '2.5rem',
                            paddingRight: '1rem',
                            width: '320px', /* Wider search */
                            height: '44px', /* Larger tap target */
                            backgroundColor: 'white',
                            borderRadius: '999px',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem' }}>
                <button
                    onClick={() => alert('Notifications: No new notifications')}
                    style={{ position: 'relative', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    title="Notifications"
                >
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--danger)'
                    }}></span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ textAlign: 'right', display: 'none', '@media (min-width: 768px)': { display: 'block' } } as any}> {/* Hide name on mobile if needed */}
                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.companyName}</div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/settings'} /* Simple redirect to settings for profile edit for now */
                        title="Edit Profile"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#e0e7ff',
                            color: 'var(--primary)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <User size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
