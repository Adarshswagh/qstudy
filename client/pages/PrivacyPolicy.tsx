"use client";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Title Section */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-primary-foreground/80 mb-4">
            Home &gt; Privacy Policy
          </div>
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-primary-foreground">
            Privacy Policy
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
                <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy for Q Study</h1>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
                
                <h2 className="text-2xl font-bold text-primary mb-4">Interpretation and Definitions</h2>
                <h3 className="text-xl font-bold text-primary mb-3">Interpretation</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-primary mb-3">2.1 Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Register for our services or create an account</li>
                  <li>Fill out contact forms or enquiry forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or feedback forms</li>
                  <li>Contact us for support or information</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This information may include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Demographic information (age, nationality, educational background)</li>
                  <li>Academic interests and preferences</li>
                  <li>Application documents and academic records</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Provide and improve our educational consulting services</li>
                  <li>Process university applications and visa assistance</li>
                  <li>Send you relevant information about programs and opportunities</li>
                  <li>Respond to your enquiries and provide customer support</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Send newsletters and marketing communications (with your consent)</li>
                  <li>Analyze website usage and improve our services</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-primary mb-3">4.1 With Universities and Educational Institutions</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your academic information and application documents with universities and educational institutions to facilitate your admission process.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">4.2 With Service Providers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share information with trusted third-party service providers who assist us in operating our website and providing services.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">4.3 Legal Requirements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may disclose information when required by law, court order, or government regulation, or to protect our rights and safety.
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3">4.4 Business Transfers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Employee training on data protection</li>
                  <li>Secure data storage and backup systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">6. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Generally:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Application data is retained for the duration of your educational journey and up to 7 years after completion</li>
                  <li>Marketing data is retained until you opt out or request deletion</li>
                  <li>Website analytics data is retained for up to 2 years</li>
                  <li>Legal compliance data may be retained longer as required by applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct or update inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Data portability (receive your data in a structured format)</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device that help us:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As an international education consultancy, we may transfer your personal information to countries outside your country of residence, including Malaysia, the United Kingdom, Canada, Australia, and other countries where our partner universities are located. We ensure that such transfers are conducted in accordance with applicable data protection laws and with appropriate safeguards in place.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">10. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our services are intended for individuals who are at least 16 years old. We do not knowingly collect personal information from children under 16 without parental consent. If we become aware that we have collected information from a child under 16 without proper consent, we will take steps to delete such information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">11. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website may contain links to third-party websites, including university websites, government portals, and other educational resources. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">13. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-primary/5 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700">
                    <strong>QStudy World</strong><br />
                    Kuala Lumpur, Malaysia
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> <a href="mailto:info@qstudyworld.com" className="text-primary hover:underline">info@qstudyworld.com</a><br />
                    <strong>Phone:</strong> <a href="tel:+60125037122" className="text-primary hover:underline">+60 12-503 7122</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Data Protection Officer:</strong><br />
                    Email: <a href="mailto:privacy@qstudyworld.com" className="text-primary hover:underline">privacy@qstudyworld.com</a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">14. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This Privacy Policy is governed by the laws of Malaysia. Any disputes arising from this policy will be subject to the jurisdiction of the Malaysian courts.
                </p>
              </section>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
