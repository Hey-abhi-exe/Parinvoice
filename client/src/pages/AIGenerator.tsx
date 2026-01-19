import { useState } from 'react';
import Layout from '../components/Layout';
import { Sparkles, Send, Bot, Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AIGenerator() {
    const { token } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setResponse('');

        try {
            const res = await fetch('http://localhost:3001/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ prompt: `Act as a financial assistant. User query: ${prompt}` })
            });

            const data = await res.json();

            const message = data.response || data.text;

            if (message) {
                setResponse(message);
            } else if (data.error) {
                setResponse(`Error: ${data.error}`);
            } else {
                setResponse('Sorry, I could not generate a response.');
            }

            // Handle Action Visuals
            if (data.action === 'create_invoice') {
                setResponse((prev) => prev + '\n\n✅ Invoice created successfully!');
                // In a real app, we might add a structured object to state to render a styled card
                // For now, appending text with a checkmark is a good MVP indicator.
            }

        } catch (error) {
            setResponse('Error connecting to AI service. Please ensure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="AI Invoice Assistant">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', height: 'calc(100vh - 180px)' }}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Chat Area */}
                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px' }}>
                        {!response && !loading && (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                                <Bot size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>AI Task Agent</h3>
                                <p>I can create invoices for you. Try asking:</p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <span style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>"Create an invoice for Apple for $500 for design"</span>
                                    <span style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>"Draft an invoice for John Doe for $150"</span>
                                </div>
                            </div>
                        )}

                        {prompt && response && (
                            <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
                                <div style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '0.75rem 1rem', borderRadius: '12px 12px 0 12px' }}>
                                    {prompt}
                                </div>
                            </div>
                        )}

                        {loading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                <Sparkles className="animate-float" size={20} /> Processing...
                            </div>
                        )}

                        {response && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ minWidth: '32px', height: '32px', background: 'var(--accent-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '10px' }}>
                                    <Bot size={18} color="white" />
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0 12px 12px 12px', boxShadow: 'var(--glass-shadow)', width: '100%' }}>
                                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{response}</pre>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(response)}
                                        style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                                    >
                                        <Copy size={14} /> Copy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your invoice or ask a question..."
                            style={{ flex: 1 }}
                            disabled={loading}
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading || !prompt.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
