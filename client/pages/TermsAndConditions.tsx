"use client";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Title Section */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-primary-foreground/80 mb-4">
            Home &gt; Terms and Conditions
          </div>
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-primary-foreground">
            Terms and Conditions
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-8xl mx-auto"
        >
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              
              <section>
                <h1 className="text-3xl font-bold text-primary mb-6">Terms and Conditions for Q Study</h1>
                <p className="text-gray-700 leading-relaxed mb-6">
                  These Terms and Conditions ("Terms") govern your use of the QStudy World website and services. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Please read these Terms carefully before using our services. If you do not agree to these Terms, please do not use our services.
                </p>
                
                <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By accessing and using the services provided by QStudy World ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">2. Description of Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  QStudy World provides educational consulting services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>University admission consultation and guidance</li>
                  <li>Application processing and document verification</li>
                  <li>Visa application assistance and support</li>
                  <li>Scholarship and financial aid guidance</li>
                  <li>Pre-departure orientation and support</li>
                  <li>Academic pathway planning and career counseling</li>
                  <li>Accommodation and travel arrangements</li>
                  <li>Ongoing student support services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">3. Client Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a client of QStudy World, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Provide accurate, complete, and up-to-date information</li>
                  <li>Submit all required documents in a timely manner</li>
                  <li>Meet application deadlines and requirements</li>
                  <li>Pay all applicable fees as agreed upon</li>
                  <li>Maintain communication with our consultants</li>
                  <li>Comply with university and visa requirements</li>
                  <li>Inform us of any changes in your circumstances</li>
                  <li>Provide truthful and authentic academic records</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">4. Fees and Payment Terms</h2>
                
                <h3 className="text-xl font-semibold text-primary mb-3">4.1 Consultation Services</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our initial consultation services are provided free of charge. Additional services may incur fees as communicated during the consultation process.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">4.2 Application Processing Fees</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  University application fees, visa processing fees, and other third-party costs are the responsibility of the client and are payable directly to the relevant authorities or institutions.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">4.3 Payment Terms</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Any applicable fees must be paid according to the agreed payment schedule. Late payments may result in suspension of services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">5. Service Limitations and Disclaimers</h2>
                
                <h3 className="text-xl font-semibold text-primary mb-3">5.1 Admission Guarantees</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While we strive to provide the best possible guidance and support, we cannot guarantee university admission, visa approval, or scholarship awards. These decisions are ultimately made by the respective universities, immigration authorities, and scholarship committees.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">5.2 Information Accuracy</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We provide information based on current knowledge and official sources. However, policies, requirements, and procedures may change without notice. We recommend verifying all information directly with the relevant institutions.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">5.3 Third-Party Services</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may refer you to third-party service providers for certain services. We are not responsible for the quality, timeliness, or outcomes of services provided by third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">6. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content, materials, and information provided by QStudy World, including but not limited to guides, templates, and educational materials, are protected by intellectual property laws. You may not reproduce, distribute, or use these materials without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">7. Confidentiality and Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to maintaining the confidentiality of your personal information and academic records. We will only share your information with relevant institutions and authorities as necessary for processing your applications, and in accordance with our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law, QStudy World shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Loss of profits, data, or opportunities</li>
                  <li>Delays in application processing</li>
                  <li>University admission rejections</li>
                  <li>Visa application denials</li>
                  <li>Changes in immigration policies</li>
                  <li>Third-party service failures</li>
                  <li>Force majeure events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">9. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to indemnify and hold harmless QStudy World, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services, violation of these terms, or infringement of any rights of another party.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">10. Termination of Services</h2>
                
                <h3 className="text-xl font-semibold text-primary mb-3">10.1 Termination by Client</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may terminate our services at any time by providing written notice. However, fees for services already provided are non-refundable.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">10.2 Termination by QStudy World</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to terminate services if you breach these terms, provide false information, or engage in fraudulent activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">11. Force Majeure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, pandemics, war, terrorism, or other force majeure events.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">12. Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-primary mb-3">12.1 Negotiation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In case of any dispute, both parties agree to first attempt to resolve the matter through good faith negotiations.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">12.2 Mediation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If negotiation fails, disputes may be referred to mediation through a mutually agreed mediator.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">12.3 Arbitration</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Any disputes not resolved through negotiation or mediation shall be subject to binding arbitration in Malaysia under the rules of the Malaysian Arbitration Act.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">13. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms and Conditions are governed by and construed in accordance with the laws of Malaysia. Any legal proceedings shall be conducted in the courts of Malaysia.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">14. Severability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">15. Entire Agreement</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you and QStudy World regarding the use of our services and supersede all prior agreements and understandings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">16. Modifications</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">17. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions, concerns, or clarifications regarding these Terms and Conditions, please contact us:
                </p>
                <div className="bg-primary/5 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700">
                    <strong>QStudy World</strong><br />
                    Kuala Lumpur, Malaysia
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> info@qstudyworld.com<br />
                    <strong>Phone:</strong> +60 12-503 7122
                  </p>
                  <p className="text-gray-700">
                    <strong>Legal Department:</strong><br />
                    Email: legal@qstudyworld.com
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">18. Acknowledgment</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. You also acknowledge that you have read and understood our Privacy Policy.
                </p>
              </section>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
