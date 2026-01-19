import Layout from '../components/Layout';

export default function About() {
    return (
        <Layout title="About Us">
            <div className="max-w-3xl mx-auto py-12">
                <h1 className="text-4xl font-bold mb-6 text-gray-900">About Parinvoice</h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Parinvoice is on a mission to simplify financial management for freelancers and small businesses.
                    We believe that you should spend your time doing what you love, not wrestling with spreadsheets and invoices.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Founded in 2026, we noticed that most invoicing tools were either too simple or too complex.
                    We built Parinvoice to find the sweet spot: powerful AI features wrapped in a beautiful, easy-to-use interface.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Values</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
                    <li><strong>Simplicity:</strong> If it's not intuitive, it's not finished.</li>
                    <li><strong>Transparency:</strong> No hidden fees, ever.</li>
                    <li><strong>Security:</strong> Your data is sacred. We protect it with bank-grade security.</li>
                </ul>
            </div>
        </Layout>
    );
}
