import Layout from '../components/Layout';

export default function Terms() {
    return (
        <Layout title="Terms of Service">
            <div className="max-w-3xl mx-auto py-12">
                <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                <p className="text-gray-500 mb-8">Last updated: January 2026</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 mb-4">
                        By accessing or using Parinvoice, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">2. Subscriptions</h2>
                    <p className="text-gray-600 mb-4">
                        Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">3. Termination</h2>
                    <p className="text-gray-600 mb-4">
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </section>
            </div>
        </Layout>
    );
}
