import Layout from '../components/Layout';

export default function Privacy() {
    return (
        <Layout title="Privacy Policy">
            <div className="max-w-3xl mx-auto py-12">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">Last updated: January 2026</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                    <p className="text-gray-600 mb-4">
                        We collect information you provide directly to us, such as when you create an account, create an invoice, or communicate with us. This may include your name, email address, payment information, and client details.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <p className="text-gray-600 mb-4">
                        We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you technical notices, and respond to your comments.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
                    <p className="text-gray-600 mb-4">
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>
                </section>
            </div>
        </Layout>
    );
}
