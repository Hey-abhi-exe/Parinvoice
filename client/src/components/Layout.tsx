import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout({ children, title }: { children: ReactNode, title: string }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f8fafc' }}>
            <Sidebar />
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', /* Allow it to grow */
                marginLeft: '280px' /* Keep space for fixed sidebar */
            }}>
                <Header title={title} />
                <main style={{
                    padding: '2rem',
                    flex: 1,
                    maxWidth: '1400px',
                    width: '100%',
                    margin: '0 auto'
                }}>
                    {children}
                </main>
            </div>

            <BottomNav />
        </div>
    );
}
