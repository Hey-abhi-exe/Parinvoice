import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Settings {
    currency: string;
    taxRate: number;
    taxLabel: string;
    logoUrl: string;
    brandColor: string;
    invoiceNote: string;
}

interface SettingsContextType {
    settings: Settings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
    updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
    formatCurrency: (amount: number) => string;
}

const defaultSettings: Settings = {
    currency: 'USD',
    taxRate: 0,
    taxLabel: 'Tax',
    logoUrl: '',
    brandColor: '#2563eb',
    invoiceNote: ''
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            refreshSettings();
        } else {
            setLoading(false);
        }
    }, [token]);

    const refreshSettings = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/settings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data) setSettings({ ...defaultSettings, ...data });
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: Partial<Settings>) => {
        try {
            const res = await fetch('http://localhost:3001/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newSettings)
            });
            if (res.ok) {
                setSettings(prev => ({ ...prev, ...newSettings }));
            }
        } catch (error) {
            console.error('Failed to update settings:', error);
            throw error;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: settings.currency || 'USD'
        }).format(amount);
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings, updateSettings, formatCurrency }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
