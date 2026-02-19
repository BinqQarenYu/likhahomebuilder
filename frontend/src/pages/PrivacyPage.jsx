import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#C4D600' }}>
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: January 2024</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to Likha Home Builders ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">
              We may collect, use, store and transfer different kinds of personal data about you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Identity Data: includes first name, last name, username or similar identifier</li>
              <li>Contact Data: includes email address, telephone numbers, and mailing address</li>
              <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location</li>
              <li>Usage Data: includes information about how you use our website and services</li>
              <li>Marketing and Communications Data: includes your preferences in receiving marketing from us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To send you newsletters and marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
            <p className="leading-relaxed">
              We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. When we no longer need your personal data, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Legal Rights</h2>
            <p className="leading-relaxed mb-3">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
            <p className="leading-relaxed">
              Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="leading-relaxed mb-3">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="ml-4 space-y-2">
              <p>Email: info@likhahomebuilders.com</p>
              <p>Phone: +63 (2) 8123-4567</p>
              <p>Address: 123 Construction Ave, Building District, Manila 1234, Philippines</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;