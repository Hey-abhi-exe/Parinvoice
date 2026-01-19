import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Sparkles, MessageSquare, Star, TrendingUp, ShieldCheck, PieChart, Users, Clock, DollarSign, BarChart3, Minus, Plus, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Simple Reveal Component
const RevealOnScroll = ({ children, width = '100%' }: { children: React.ReactNode, width?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`reveal ${isVisible ? 'active' : ''}`} style={{ width }}>
            {children}
        </div>
    );
};

export default function Landing() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            background: '#f8fafc'
        }}>
            {/* Background Wrapper to prevent overflow but allow sticky */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
            </div>

            {/* Floating Pill Navbar */}
            <div style={{ position: 'sticky', top: '1.5rem', zIndex: 100, padding: '0 1rem', display: 'flex', justifyContent: 'center' }}>
                <nav className="glass" style={{
                    borderRadius: '999px',
                    padding: '0.75rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1000px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                    position: 'relative'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>P</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>Parinvoice</span>
                    </div>

                    <div className="desktop-menu">
                        <Link to="/features" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>Features</Link>
                        <Link to="/pricing" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>Pricing</Link>
                        <a href="#faq" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>FAQ</a>

                        <div style={{ width: '1px', height: '24px', background: 'var(--border-light)', margin: '0 1rem' }} />

                        <Link to="/login" className="btn" style={{ padding: '0.5rem 1.25rem', borderRadius: '99px', background: 'transparent', color: 'var(--text-secondary)' }}>Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '99px' }}>Get Started</Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="mobile-menu-container">
                            <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>Features</Link>
                            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>Pricing</Link>
                            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem' }}>FAQ</a>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />
                            <Link to="/login" className="btn" style={{ justifyContent: 'center', width: '100%' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>Get Started</Link>
                        </div>
                    )}
                </nav>
            </div>

            {/* HERO SECTION */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '2rem 1rem', boxSizing: 'border-box' }} className="min-h-hero">
                <div className="container">
                    <div className="grid-responsive" style={{ gap: '2rem', alignItems: 'center' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <RevealOnScroll>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e0e7ff', color: 'var(--primary)', borderRadius: '99px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                                    <Sparkles size={16} /> New: AI Invoice Generator
                                </div>
                                <h1 className="text-balance text-clamp-2" style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Invoicing that feels like magic.
                                </h1>
                                <p className="text-balance text-clamp-2" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                                    Stop wrestling with spreadsheets. Let our AI build, send, and track professional invoices for you in seconds.
                                </p>
                                <div className="btn-group btn-group-left">
                                    <Link to="/register" style={{ padding: '1rem 2rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)' }}>Start for Free</Link>
                                    <Link to="#demo" style={{ padding: '1rem 2rem', backgroundColor: 'white', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem' }}>View Demo</Link>
                                </div>
                                <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} color="var(--success)" /> No credit card required</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} color="var(--success)" /> Cancel anytime</div>
                                </div>
                            </RevealOnScroll>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <RevealOnScroll>
                                <div className="glass" style={{
                                    padding: '2rem',
                                    borderRadius: '24px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    transform: 'rotate(-2deg)',
                                    background: 'rgba(255,255,255,0.9)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Invoice #001</div>
                                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>To: Acme Corp</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$2,500.00</div>
                                            <div style={{ color: 'var(--warning)', fontSize: '0.9rem', fontWeight: '600', backgroundColor: '#fef3c7', padding: '0.2rem 0.6rem', borderRadius: '4px', display: 'inline-block' }}>Pending</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Web Development</span>
                                            <span>$1,500.00</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>UI/UX Design</span>
                                            <span>$1,000.00</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="User" />
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Due in 14 days</div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="section-compact" style={{ background: 'white', position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ color: 'var(--danger)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>The Problem</span>
                    <h2 style={{ fontSize: '2.75rem', marginTop: '1rem', marginBottom: '2rem', lineHeight: '1.2' }}>
                        Invoicing is <span className="text-gradient">eating your time</span>
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '4rem' }}>
                        You're a freelancer or small business owner. You should be focused on your craft, not wrestling with spreadsheets, chasing payments, or manually tracking expenses.
                    </p>

                    <RevealOnScroll>
                        <div className="grid-responsive">
                            <ProblemCard icon={<Clock size={28} color="var(--danger)" />} title="Hours Wasted" desc="Manually creating invoices and tracking payments" />
                            <ProblemCard icon={<TrendingUp size={28} color="var(--danger)" />} title="Late Payments" desc="Clients forget, you lose money and momentum" />
                            <ProblemCard icon={<PieChart size={28} color="var(--danger)" />} title="Tax Chaos" desc="Scrambling to organize expenses at year-end" />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* SOLUTION SECTION */}
            <section className="section-compact" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', color: 'white', position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>The Solution</span>
                    <h2 style={{ fontSize: '2.75rem', marginTop: '1rem', marginBottom: '2rem', lineHeight: '1.2', color: 'white' }}>
                        AI that handles it all for you
                    </h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.7', marginBottom: '3rem' }}>
                        Parinvoice uses AI to automate invoicing, expense tracking, and payment reminders. You focus on your work. We handle the rest.
                    </p>

                    <RevealOnScroll>
                        <div className="grid-responsive" style={{ marginTop: '3rem' }}>
                            <SolutionCard icon={<Sparkles size={28} />} title="AI Invoice Generation" desc="Describe your work, AI creates the invoice" />
                            <SolutionCard icon={<Clock size={28} />} title="Auto Reminders" desc="Never chase a payment again" />
                            <SolutionCard icon={<BarChart3 size={28} />} title="Smart Insights" desc="Know your finances at a glance" />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* CREATIVE HOW IT WORKS SECTION */}
            <section id="how-it-works" className="section-compact" style={{ padding: '6rem 1rem', background: '#f8fafc', position: 'relative' }}>
                <div className="container">
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>How it works</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>From idea to payment in three simple steps.</p>
                        </div>
                    </RevealOnScroll>

                    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
                        {/* Connecting Line (Desktop) */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '4px',
                            height: '80%',
                            background: 'var(--border-light)',
                            zIndex: 0,
                            borderRadius: '2px',
                            display: 'none',
                            '@media (min-width: 768px)': { display: 'block' }
                        } as any} />

                        {/* Step 1 */}
                        <RevealOnScroll>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', marginBottom: '6rem', flexDirection: 'row' } as any}>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary-light)', opacity: 0.3, lineHeight: 1 }}>01</div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '700', margin: '0.5rem 0' }}>Generate Instantly</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                        Just describe your work: "Web design for Acme Corp, $500". Our AI parses the details and builds a structured invoice instantly.
                                    </p>
                                </div>
                                <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 1, boxShadow: '0 0 0 10px #f8fafc' }}>
                                    <Sparkles size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', transform: 'rotate(2deg)' }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>User Input:</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '500', fontFamily: 'monospace', background: '#e0e7ff', padding: '1rem', borderRadius: '8px', color: 'var(--primary-dark)' }}>
                                            "Invoice Client X for Project Y..."
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Step 2 */}
                        <RevealOnScroll>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: '4rem', marginBottom: '6rem' } as any}>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-cyan)', opacity: 0.3, lineHeight: 1 }}>02</div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '700', margin: '0.5rem 0' }}>Send with Style</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                        Customize colors, add your logo, and send via email or a secure link. It looks professional on any device.
                                    </p>
                                </div>
                                <div style={{ width: '60px', height: '60px', background: 'var(--accent-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 1, boxShadow: '0 0 0 10px #f8fafc' }}>
                                    <MessageSquare size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', transform: 'rotate(-2deg)', textAlign: 'center' }}>
                                        <div style={{ width: '80%', height: '10px', background: 'var(--border-light)', margin: '0 auto 1rem', borderRadius: '5px' }}></div>
                                        <div style={{ width: '60%', height: '10px', background: 'var(--border-light)', margin: '0 auto 1rem', borderRadius: '5px' }}></div>
                                        <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', display: 'inline-block', fontSize: '0.9rem' }}>Pay Now</div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Step 3 */}
                        <RevealOnScroll>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', marginBottom: '2rem' } as any}>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--success)', opacity: 0.3, lineHeight: 1 }}>03</div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '700', margin: '0.5rem 0' }}>Get Paid Faster</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                        Track when clients open your invoice. Accept payments online and get money in your bank account securely.
                                    </p>
                                </div>
                                <div style={{ width: '60px', height: '60px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 1, boxShadow: '0 0 0 10px #f8fafc' }}>
                                    <DollarSign size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', transform: 'rotate(2deg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                                            <CheckCircle size={24} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>Payment Received</div>
                                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Just now</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="section-compact" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Everything you need</span>
                        <h2 style={{ fontSize: '3rem', marginTop: '1rem' }}>Run your business on <span className="text-gradient">Autopilot</span></h2>
                    </div>

                    <RevealOnScroll>
                        <div className="grid-responsive">
                            <BentoCard icon={<Zap size={32} color="var(--accent-cyan)" />} title="Instant Invoicing" desc="Create beautiful invoices in seconds. Not minutes." emoji="⚡" />
                            <BentoCard icon={<Sparkles size={32} color="var(--accent-purple)" />} title="AI Superpowers" desc="Let Gemini AI write your emails and categorize expenses." emoji="🧠" />
                            <BentoCard icon={<ShieldCheck size={32} color="var(--success)" />} title="Bank-Grade Security" desc="Your financial data is encrypted and safe with us." emoji="🔒" />
                            <BentoCard icon={<PieChart size={32} color="#f59e0b" />} title="Financial Insights" desc="Know exactly where your money is going." emoji="📊" />
                            <BentoCard icon={<Users size={32} color="#ec4899" />} title="Client Portal" desc="Give clients a professional dashboard to pay you." emoji="🤝" />
                            <BentoCard icon={<MessageSquare size={32} color="var(--primary)" />} title="24/7 Support" desc="Real humans (and smart bots) here to help." emoji="💬" />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* USE CASES */}
            <section style={{ padding: '6rem 1rem', background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Perfect For</span>
                        <h2 style={{ fontSize: '2.75rem', marginTop: '1rem' }}>Built for <span className="text-gradient">modern professionals</span></h2>
                    </div>

                    <RevealOnScroll>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <UseCaseCard emoji="💻" title="Freelancers" desc="Developers, designers, writers, and consultants" />
                            <UseCaseCard emoji="🎨" title="Creative Agencies" desc="Marketing, branding, and production studios" />
                            <UseCaseCard emoji="🏗️" title="Contractors" desc="Construction, plumbing, electrical services" />
                            <UseCaseCard emoji="📸" title="Content Creators" desc="Photographers, videographers, influencers" />
                            <UseCaseCard emoji="🚀" title="Startups" desc="SaaS founders, early-stage teams, and innovators" />
                            <UseCaseCard emoji="💼" title="Consultants" desc="Financial, legal, and business advisors" />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* SOCIAL PROOF / TESTIMONIALS */}
            <section style={{ padding: '6rem 1rem', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>Don't take our word for it. <br /> <span style={{ opacity: 0.5 }}>Take theirs.</span></h2>

                    <RevealOnScroll>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <TestimonialCard
                                text="I used to hate end-of-month invoicing. Now I assume the AI does it, and it usually does. Verified magic."
                                author="Sarah Jenkins"
                                role="Freelance Designer"
                            />
                            <TestimonialCard
                                text="The interface is just... *chef's kiss*. It feels like using a premium tool, not some clunky enterprise software."
                                author="Mike Ross"
                                role="Software Engineer"
                            />
                            <TestimonialCard
                                text="Support answered my WhatsApp in 2 minutes. Where else do you get that kind of service?"
                                author="Priya Sharma"
                                role="Agency Owner"
                            />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section id="pricing" className="section-compact" style={{ background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Pricing</span>
                        <h2 style={{ fontSize: '2.75rem', marginTop: '1rem' }}>Simple, <span className="text-gradient">transparent pricing</span></h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>Start free. Scale when you're ready.</p>
                    </div>

                    <RevealOnScroll>
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
                    </RevealOnScroll>
                </div>
            </section>

            {/* CTA SECTION */}
            <section style={{ padding: '8rem 1rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))', color: 'white', padding: '4rem 2rem' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'white' }}>Ready to upgrade your workflow?</h2>
                        <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9 }}>Join thousands of freelancers getting paid faster.</p>
                        <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '99px' }}>
                            Get Started for Free
                        </Link>
                        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>No credit card required • Cancel anytime</div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" style={{ padding: '6rem 1rem', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>FAQ</span>
                        <h2 style={{ fontSize: '2.75rem', marginTop: '1rem' }}>Frequently Asked <span className="text-gradient">Questions</span></h2>
                    </div>

                    <RevealOnScroll>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <FAQItem
                                question="Is Parinvoice really free?"
                                answer="Yes! Our free plan includes 5 invoices per month, basic templates, and email support. Perfect for getting started."
                            />
                            <FAQItem
                                question="How does the AI invoice generation work?"
                                answer="Simply describe your work in natural language, and our AI (powered by Google Gemini) will generate a professional invoice with line items, pricing, and descriptions."
                            />
                            <FAQItem
                                question="Can I accept payments through Parinvoice?"
                                answer="Yes! We integrate with major payment processors to let you accept credit cards, bank transfers, and more."
                            />
                            <FAQItem
                                question="Is my financial data secure?"
                                answer="Absolutely. We use bank-grade encryption and never store your payment information. Your data is always protected."
                            />
                            <FAQItem
                                question="Can I cancel anytime?"
                                answer="Yes, you can cancel your subscription at any time. No questions asked, no hidden fees."
                            />
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: '4rem 1rem', borderTop: '1px solid var(--border-light)', background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>P</div>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Parinvoice</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AI-powered invoicing for modern businesses.</p>
                        </div>

                        <div>
                            <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Product</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link to="/features" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</Link>
                                <Link to="/pricing" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</Link>
                                <Link to="/ai-generator" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Generator</Link>
                                <Link to="/tools" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Free Tools</Link>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Company</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link to="/about" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
                                <Link to="/support" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Support</Link>
                                <Link to="/privacy" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy</Link>
                                <Link to="/terms" target="_blank" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms</Link>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Connect</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <a href="https://twitter.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Twitter</a>
                                <a href="https://linkedin.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>LinkedIn</a>
                                <a href="https://instagram.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Instagram</a>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            © 2026 Parinvoice Inc. All rights reserved.
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
                            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link>
                            <Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Helper Components
function ProblemCard({ icon, title, desc }: any) {
    return (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{desc}</p>
        </div>
    );
}

function SolutionCard({ icon, title, desc }: any) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>{icon}</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>{title}</h3>
            <p style={{ opacity: 0.9, lineHeight: '1.6' }}>{desc}</p>
        </div>
    );
}


function BentoCard({ icon, title, desc, emoji }: any) {
    return (
        <div className="glass-card glow-on-hover" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '14px' }}>{icon}</div>
                <div style={{ fontSize: '1.5rem' }}>{emoji}</div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1 }}>{desc}</p>
        </div>
    );
}

function UseCaseCard({ emoji, title, desc }: any) {
    return (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{emoji}</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
        </div>
    );
}

function TestimonialCard({ text, author, role }: any) {
    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', fontStyle: 'italic' }}>"{text}"</p>
            <div>
                <div style={{ fontWeight: 'bold' }}>{author}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{role}</div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, period = '', features, btnText, link, gradient = false }: any) {
    return (
        <div className="glass-card" style={{
            padding: '2.5rem',
            border: gradient ? '2px solid var(--accent-purple)' : '1px solid var(--border-light)',
            background: gradient ? 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(245,243,255,0.95) 100%)' : 'rgba(255,255,255,0.85)',
            transform: gradient ? 'scale(1.05)' : 'scale(1)',
            position: 'relative'
        }}>
            {gradient && <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent-purple)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '600' }}>POPULAR</div>}
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>{title}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--text-primary)' }}>{price}</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{period}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {features.map((f: string, i: number) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-primary)' }}>
                        <CheckCircle size={18} color="var(--success)" />
                        {f}
                    </li>
                ))}
            </ul>

            <Link to={link} className={`btn ${gradient ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', justifyContent: 'center' }}>
                {btnText}
            </Link>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{question}</h3>
                {isOpen ? <Minus size={20} color="var(--primary)" /> : <Plus size={20} color="var(--primary)" />}
            </div>
            {isOpen && (
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', paddingRight: '2rem' }}>
                    {answer}
                </p>
            )}
        </div>
    );
}
