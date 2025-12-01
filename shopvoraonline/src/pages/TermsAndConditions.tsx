import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const TermsAndConditions: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="Terms and Conditions" 
        description="Read the terms and conditions for using ShopVoraOnline. Understand your rights and responsibilities when accessing our skincare content."
        keywords="terms and conditions, terms of service, user agreement, legal terms"
        url="https://shopvoraonline.com/terms-and-conditions"
      />
      
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6">Terms and Conditions</h1>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-sm text-stone-500">Last Updated: December 1, 2025</p>
          </div>
          
          <div className="prose prose-stone prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Acceptance of Terms</h2>
              <p className="text-stone-600 leading-relaxed">
                By accessing and using ShopVoraOnline ("the Website"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.
              </p>
            </section>

            <section className="mb-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Medical Disclaimer</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                <strong>IMPORTANT:</strong> The content on ShopVoraOnline is for informational and educational purposes only and is not intended as medical advice, diagnosis, or treatment.
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Always consult with a qualified healthcare professional or dermatologist before starting any new skincare regimen</li>
                <li>Individual results may vary, and what works for others may not work for you</li>
                <li>We are not responsible for any adverse reactions or consequences from using products mentioned on our site</li>
                <li>If you experience any skin irritation or allergic reaction, discontinue use immediately and seek medical attention</li>
                <li>This website should not be used as a substitute for professional medical advice</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Affiliate Relationships and Disclosure</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                ShopVoraOnline participates in various affiliate marketing programs, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Amazon Associates Program</li>
                <li>Brand-specific affiliate partnerships</li>
                <li>Affiliate networks and platforms</li>
              </ul>
              <p className="text-stone-600 leading-relaxed mt-4">
                When you click on affiliate links and make a purchase, we may earn a commission at no additional cost to you. These commissions help support our website and allow us to continue providing free content. Our affiliate relationships do not influence our reviews, recommendations, or editorial integrity. We only recommend products we genuinely believe in and have thoroughly researched.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                All content on ShopVoraOnline, including but not limited to text, graphics, logos, images, videos, and software, is the property of ShopVoraOnline or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-stone-600 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works, publicly display, or exploit any content from our website without our express written permission. Limited exceptions include sharing content on social media with proper attribution and linking back to the original source.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">User Conduct and Prohibited Activities</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                When using our website, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>Transmit any harmful code, viruses, or malware</li>
                <li>Engage in unauthorized scraping or data collection</li>
                <li>Post offensive, defamatory, or harassing content</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">User-Generated Content</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                If you submit comments, reviews, or other content to our website:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>You grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content</li>
                <li>You represent that you have the right to submit the content</li>
                <li>You agree that your content does not violate any laws or third-party rights</li>
                <li>We reserve the right to remove any content at our discretion</li>
                <li>We are not responsible for user-generated content</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Product Information and Accuracy</h2>
              <p className="text-stone-600 leading-relaxed">
                While we strive to provide accurate and up-to-date information about products, prices, and availability, we cannot guarantee complete accuracy. Product information is subject to change without notice. We recommend verifying product details, ingredients, and prices with the manufacturer or retailer before making a purchase. We are not responsible for any errors or omissions in product information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Third-Party Links and Websites</h2>
              <p className="text-stone-600 leading-relaxed">
                Our website may contain links to third-party websites, including affiliate links and product pages. We are not responsible for the content, privacy practices, or terms of service of these external sites. Clicking on third-party links is at your own risk, and we encourage you to review the terms and privacy policies of any website you visit.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Limitation of Liability</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 text-stone-600 space-y-2">
                <li>ShopVoraOnline and its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages</li>
                <li>We make no warranties or representations about the accuracy, reliability, or completeness of our content</li>
                <li>We are not liable for any adverse reactions, injuries, or damages resulting from the use of products mentioned on our website</li>
                <li>Your use of the website is at your own risk</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Indemnification</h2>
              <p className="text-stone-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless ShopVoraOnline and its owners, employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the website, violation of these terms, or infringement of any third-party rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Privacy Policy</h2>
              <p className="text-stone-600 leading-relaxed">
                Your use of our website is also governed by our Privacy Policy. Please review our <a href="/privacy-policy" className="text-rose-500 hover:text-rose-600 underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Changes to Terms</h2>
              <p className="text-stone-600 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms. We encourage you to review these terms periodically.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Governing Law</h2>
              <p className="text-stone-600 leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms or your use of the website shall be resolved through binding arbitration or in the appropriate courts.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Severability</h2>
              <p className="text-stone-600 leading-relaxed">
                If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Contact Information</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                If you have any questions or concerns about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-6">
                <p className="text-stone-700"><strong>Email:</strong> <a href="mailto:contact@shopvoraonline.com" className="text-rose-500 hover:text-rose-600">contact@shopvoraonline.com</a></p>
                <p className="text-stone-700 mt-2"><strong>Website:</strong> <a href="https://shopvoraonline.com/contact" className="text-rose-500 hover:text-rose-600">shopvoraonline.com/contact</a></p>
              </div>
            </section>

            <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 mt-12">
              <p className="text-sm text-stone-600 leading-relaxed">
                By using ShopVoraOnline, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
