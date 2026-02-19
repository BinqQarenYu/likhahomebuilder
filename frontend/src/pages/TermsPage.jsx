import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#C4D600' }}>
          Terms of Service
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: January 2024</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the Likha Home Builders website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p className="leading-relaxed mb-3">
              Permission is granted to temporarily download one copy of the materials (information or software) on Likha Home Builders' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Product Information and Pricing</h2>
            <p className="leading-relaxed">
              We strive to provide accurate information about our modular home projects, including specifications, materials, and pricing. However, we reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Project Plans and Digital Products</h2>
            <p className="leading-relaxed mb-3">
              When you purchase project plans or digital products from us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You receive a license to use the plans for constructing one residential structure</li>
              <li>Plans may not be shared, distributed, or resold</li>
              <li>All intellectual property rights remain with Likha Home Builders</li>
              <li>Plans are provided in digital format and are non-refundable once delivered</li>
              <li>You must comply with all local building codes and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Construction Services</h2>
            <p className="leading-relaxed mb-3">
              For construction services:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A separate construction contract will be executed detailing specific terms</li>
              <li>Timeline estimates are approximate and subject to weather, permits, and material availability</li>
              <li>Payment terms will be specified in the construction contract</li>
              <li>You are responsible for obtaining necessary permits and approvals</li>
              <li>Changes to plans during construction may incur additional costs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, architectural plans, and software, is the property of Likha Home Builders and protected by Philippine and international copyright laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer</h2>
            <p className="leading-relaxed">
              The materials on Likha Home Builders' website are provided on an 'as is' basis. Likha Home Builders makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitations of Liability</h2>
            <p className="leading-relaxed">
              In no event shall Likha Home Builders or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if Likha Home Builders has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Warranty and Guarantees</h2>
            <p className="leading-relaxed mb-3">
              For construction projects:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Structural warranty: 10 years on steel frame structure</li>
              <li>Workmanship warranty: 2 years from project completion</li>
              <li>Material warranties: as provided by manufacturers</li>
              <li>Warranty does not cover normal wear and tear or improper maintenance</li>
              <li>Warranty claims must be submitted in writing within 30 days of discovery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Anti-Piracy Statement</h2>
            <p className="leading-relaxed font-semibold text-red-400 mb-3">
              PIRACY IS A CRIME
            </p>
            <p className="leading-relaxed">
              The sale and distribution of Likha Home Builders' project plans may only be made through this official website. Any other site or individual offering our plans is operating illegally and against the law. We actively pursue legal action against copyright infringement. If you encounter unauthorized sales of our plans, please report it to info@likhahomebuilders.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the Philippines, and you irrevocably submit to the exclusive jurisdiction of the courts in Manila, Philippines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page with an updated "Last Updated" date. Your continued use of the service after such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
            <p className="leading-relaxed mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="ml-4 space-y-2">
              <p>Likha Home Builders</p>
              <p>Email: info@likhahomebuilders.com</p>
              <p>Phone: +63 (2) 8123-4567</p>
              <p>Address: 123 Construction Ave, Building District, Manila 1234, Philippines</p>
              <p>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM</p>
            </div>
          </section>

          <section className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <p className="text-white font-semibold mb-2">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="text-gray-400 text-sm">
              Copyright 2024 – LIKHA HOME BUILDERS ®. All rights reserved.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;