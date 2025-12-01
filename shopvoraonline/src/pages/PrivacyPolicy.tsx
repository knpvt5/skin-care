import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy" 
        description="Learn how ShopVoraOnline collects, uses, and protects your personal information. Read our comprehensive privacy policy."
        keywords="privacy policy, data protection, user privacy, information security"
        url="https://shopvoraonline.com/privacy-policy"
      />
      
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6">Privacy Policy</h1>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-sm text-stone-500">Last Updated: December 1, 2025</p>
          </div>
          
          <div className="prose prose-stone prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Introduction</h2>
              <p className="text-stone-600 leading-relaxed">
                Welcome to ShopVoraOnline ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Information We Collect</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, and other contact details when you subscribe to our newsletter or contact us</li>
                <li><strong>Account Information:</strong> Username, password, and profile information if you create an account</li>
                <li><strong>Communication Data:</strong> Messages you send us through contact forms or email</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and interactions</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">How We Use Your Information</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you newsletters, marketing communications, and updates (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12 bg-rose-50 border border-rose-200 rounded-lg p-6">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Affiliate Disclosure</h2>
              <p className="text-stone-600 leading-relaxed">
                ShopVoraOnline participates in affiliate marketing programs. We may earn commissions when you purchase products through our affiliate links. This means that when you click on certain links on our site and make a purchase, we may receive compensation at no additional cost to you. We only recommend products we genuinely believe in and have researched thoroughly. Our affiliate relationships do not influence our editorial content or product reviews.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect and track information about your browsing activities. Cookies help us:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve website performance and user experience</li>
                <li>Deliver personalized content and advertisements</li>
              </ul>
              <p className="text-stone-600 leading-relaxed mt-4">
                You can control cookies through your browser settings, though disabling cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Third-Party Services</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                We may use third-party services to help us operate our website and deliver services, including:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li><strong>Analytics:</strong> Google Analytics and similar tools to understand user behavior</li>
                <li><strong>Email Marketing:</strong> Email service providers to send newsletters and communications</li>
                <li><strong>Affiliate Networks:</strong> Platforms that manage our affiliate partnerships</li>
                <li><strong>Social Media:</strong> Integration with social media platforms</li>
              </ul>
              <p className="text-stone-600 leading-relaxed mt-4">
                These third parties have their own privacy policies and may collect information independently.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Data Security</h2>
              <p className="text-stone-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Your Privacy Rights</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Children's Privacy</h2>
              <p className="text-stone-600 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-stone-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Contact Us</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
              </p>
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
                <p className="text-stone-700"><strong>Email:</strong> <a href="mailto:contact@shopvoraonline.com" className="text-rose-500 hover:text-rose-600">contact@shopvoraonline.com</a></p>
                <p className="text-stone-700 mt-2"><strong>Website:</strong> <a href="https://shopvoraonline.com/contact" className="text-rose-500 hover:text-rose-600">shopvoraonline.com/contact</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
