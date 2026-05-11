import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms — Washzy",
  description:
    "How Washzy collects, uses, and protects your data, plus the terms governing your use of the service.",
};

const EFFECTIVE_DATE = "May 11, 2026";
const CONTACT_EMAIL = "washzy@washzyservice.com";

type Section = { id: string; title: string };

const privacySections: Section[] = [
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How We Use Your Information" },
  { id: "permissions", title: "3. Permissions Used" },
  { id: "data-sharing", title: "4. Data Sharing and Disclosure" },
  { id: "data-security", title: "5. Data Security" },
  { id: "data-retention", title: "6. Data Retention" },
  { id: "your-rights", title: "7. Your Rights" },
  { id: "third-party", title: "8. Third-Party Services" },
  { id: "children", title: "9. Children's Privacy" },
  { id: "international", title: "10. International Data Transfers" },
  { id: "changes", title: "11. Changes to This Privacy Policy" },
  { id: "contact", title: "12. Contact Us" },
];

const termsSections: Section[] = [
  { id: "service-description", title: "1. Service Description" },
  { id: "eligibility", title: "2. User Eligibility" },
  { id: "user-responsibilities", title: "3. User Responsibilities" },
  { id: "bookings", title: "4. Bookings and Cancellations" },
  { id: "wallet", title: "5. Wallet and Payments" },
  { id: "pricing", title: "6. Pricing and Fees" },
  { id: "ip", title: "7. Intellectual Property" },
  { id: "termination", title: "8. Account Suspension and Termination" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "warranties", title: "10. Disclaimer of Warranties" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "disputes", title: "12. Dispute Resolution" },
  { id: "terms-changes", title: "13. Changes to Terms & Conditions" },
  { id: "severability", title: "14. Severability" },
  { id: "terms-contact", title: "15. Contact Information" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface-muted">
      <header className="bg-gradient-to-br from-navy-900 via-navy-700 to-navy-500 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100 hover:text-white transition-colors"
          >
            ← Back to Washzy
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
            Privacy Policy & Terms
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-navy-50/85 leading-relaxed">
            How Washzy collects, uses, and protects your information, and the
            rules of engagement when you use our car-wash booking platform.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-pill bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent-500" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Effective Date · {EFFECTIVE_DATE}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <nav className="rounded-card bg-white shadow-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                On this page
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold text-navy-900 uppercase tracking-wider">
                  Privacy Policy
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {privacySections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block rounded-md px-2 py-1 text-sm text-text-muted hover:bg-surface-muted hover:text-navy-900 transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold text-navy-900 uppercase tracking-wider">
                  Terms & Conditions
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {termsSections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block rounded-md px-2 py-1 text-sm text-text-muted hover:bg-surface-muted hover:text-navy-900 transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          <article className="flex flex-col gap-12">
            <DocumentBlock kind="privacy">
              <SectionHeader
                eyebrow="Part I"
                title="Privacy Policy for Washzy"
                lead="Washzy (“we”, “our”, or “us”) respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use the Washzy mobile application for car wash booking services."
              />

              <Section id="information-we-collect" title="1. Information We Collect">
                <SubSection title="1.1 Personal Information">
                  <p>
                    When you create an account or use our services, we collect:
                  </p>
                  <List>
                    <Item label="Name">
                      To personalize your experience and identify your bookings.
                    </Item>
                    <Item label="Phone Number">
                      For authentication via OTP and service notifications.
                    </Item>
                    <Item label="Profile Picture (optional)">
                      To personalize your account.
                    </Item>
                    <Item label="Vehicle Information">
                      Make, model, registration number, and vehicle type for
                      service bookings.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="1.2 Location Data">
                  <List>
                    <Item label="GPS Location">
                      Used to find nearby car wash stations and provide
                      location-based services.
                    </Item>
                    <Item label="Location Permission">
                      Required only when using the app to search for stations.
                    </Item>
                    <Item label="Background Tracking">
                      We do <Strong>not</Strong> track your location in the
                      background.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="1.3 Payment Information">
                  <List>
                    <Item>
                      Payment transactions are processed securely through{" "}
                      <Strong>Razorpay</Strong> (third-party payment gateway).
                    </Item>
                    <Item>
                      We do <Strong>not</Strong> store your credit card, debit
                      card, or banking details.
                    </Item>
                    <Item>
                      We maintain wallet balance and transaction history for
                      your account.
                    </Item>
                    <Item>
                      Razorpay Privacy Policy:{" "}
                      <ExtLink href="https://razorpay.com/privacy-policy/">
                        razorpay.com/privacy-policy
                      </ExtLink>
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="1.4 Device Information">
                  <List>
                    <Item>Device type and operating system.</Item>
                    <Item>App version and crash reports.</Item>
                    <Item>
                      Device identifiers for push notifications (FCM token).
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="1.5 Usage Data">
                  <List>
                    <Item>Booking history and service preferences.</Item>
                    <Item>Wallet transactions (top-ups, payments, refunds).</Item>
                    <Item>App interaction data to improve user experience.</Item>
                  </List>
                </SubSection>
              </Section>

              <Section id="how-we-use" title="2. How We Use Your Information">
                <p>We use the collected information to:</p>
                <List>
                  <Item label="Provide Services">
                    Process car wash bookings and manage appointments.
                  </Item>
                  <Item label="Authentication">
                    Verify your identity using Firebase Phone Authentication.
                  </Item>
                  <Item label="Payment Processing">
                    Handle wallet top-ups and service payments.
                  </Item>
                  <Item label="Communication">
                    Send booking confirmations, service updates, and important
                    notifications.
                  </Item>
                  <Item label="Customer Support">
                    Respond to your inquiries and resolve issues.
                  </Item>
                  <Item label="Service Improvement">
                    Analyze usage patterns to enhance app functionality.
                  </Item>
                  <Item label="Security">
                    Detect and prevent fraud, abuse, and unauthorized access.
                  </Item>
                </List>
              </Section>

              <Section id="permissions" title="3. Permissions Used">
                <PermissionCard
                  title="3.1 Location Permission"
                  rows={[
                    ["Purpose", "Find nearby car wash stations and display them on the map."],
                    ["When Used", "Only when you actively search for stations or view the map."],
                    ["Background Tracking", "We do NOT track your location when the app is closed."],
                  ]}
                />
                <PermissionCard
                  title="3.2 Camera Permission"
                  rows={[
                    ["Purpose", "Upload profile pictures."],
                    ["When Used", "Only when you choose to update your profile photo."],
                    ["Storage", "Photos are uploaded to secure cloud storage (AWS S3)."],
                  ]}
                />
                <PermissionCard
                  title="3.3 Photo Library Permission"
                  rows={[
                    ["Purpose", "Select existing photos for your profile picture."],
                    ["When Used", "Only when you choose to update your profile photo."],
                  ]}
                />
                <PermissionCard
                  title="3.4 Notification Permission"
                  rows={[
                    ["Purpose", "Send booking confirmations, service updates, and promotional offers."],
                    ["Control", "You can disable notifications in your device settings."],
                  ]}
                />
              </Section>

              <Section id="data-sharing" title="4. Data Sharing and Disclosure">
                <Callout tone="success">
                  We respect your privacy and do <Strong>not</Strong> sell your
                  personal information to third parties.
                </Callout>
                <SubSection title="4.1 Service Providers">
                  <p>We share limited data with:</p>
                  <List>
                    <Item label="Razorpay">For secure payment processing.</Item>
                    <Item label="Firebase (Google)">
                      For authentication and push notifications.
                    </Item>
                    <Item label="AWS S3">
                      For secure image storage (profile pictures).
                    </Item>
                    <Item label="Car Wash Stations">
                      Your name, phone number, and vehicle details for service
                      fulfillment.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="4.2 Legal Requirements">
                  <p>We may disclose your information if required by:</p>
                  <List>
                    <Item>Law enforcement or government authorities.</Item>
                    <Item>Court orders or legal processes.</Item>
                    <Item>Protection of our rights, safety, or property.</Item>
                  </List>
                </SubSection>
                <SubSection title="4.3 Business Transfers">
                  <p>
                    In the event of a merger, acquisition, or sale of assets,
                    your information may be transferred to the new entity.
                  </p>
                </SubSection>
              </Section>

              <Section id="data-security" title="5. Data Security">
                <p>
                  We implement industry-standard security measures to protect
                  your information:
                </p>
                <List>
                  <Item label="Encryption">
                    Data transmitted over secure HTTPS connections.
                  </Item>
                  <Item label="Secure Storage">
                    Sensitive data stored using encryption (SecureStore).
                  </Item>
                  <Item label="Firebase Authentication">
                    Industry-leading authentication security.
                  </Item>
                  <Item label="Access Controls">
                    Limited employee access to personal data.
                  </Item>
                  <Item label="Regular Audits">
                    Periodic security assessments.
                  </Item>
                </List>
                <Callout tone="warning">
                  No method of transmission over the internet is 100% secure.
                  We cannot guarantee absolute security.
                </Callout>
              </Section>

              <Section id="data-retention" title="6. Data Retention">
                <List>
                  <Item label="Active Accounts">
                    We retain your data as long as your account is active.
                  </Item>
                  <Item label="Inactive Accounts">
                    Data may be retained for up to 2 years after account
                    deletion for legal and business purposes.
                  </Item>
                  <Item label="Transaction Records">
                    Retained for 7 years for tax and legal compliance.
                  </Item>
                  <Item label="Account Deletion">
                    You can request account deletion by contacting us at{" "}
                    <MailLink />.
                  </Item>
                </List>
              </Section>

              <Section id="your-rights" title="7. Your Rights">
                <p>You have the right to:</p>
                <List>
                  <Item label="Access">
                    Request a copy of your personal data.
                  </Item>
                  <Item label="Correction">
                    Update or correct inaccurate information.
                  </Item>
                  <Item label="Deletion">
                    Request deletion of your account and data.
                  </Item>
                  <Item label="Opt-Out">
                    Unsubscribe from promotional communications.
                  </Item>
                  <Item label="Data Portability">
                    Request your data in a machine-readable format.
                  </Item>
                </List>
                <p className="mt-2">
                  To exercise these rights, contact us at <MailLink />.
                </p>
              </Section>

              <Section id="third-party" title="8. Third-Party Services">
                <p>
                  Our app integrates with third-party services. Please review
                  their privacy policies:
                </p>
                <List>
                  <Item label="Firebase (Google)">
                    <ExtLink href="https://firebase.google.com/support/privacy">
                      firebase.google.com/support/privacy
                    </ExtLink>
                  </Item>
                  <Item label="Razorpay">
                    <ExtLink href="https://razorpay.com/privacy-policy/">
                      razorpay.com/privacy-policy
                    </ExtLink>
                  </Item>
                  <Item label="Google Maps">
                    <ExtLink href="https://policies.google.com/privacy">
                      policies.google.com/privacy
                    </ExtLink>
                  </Item>
                </List>
                <p className="mt-2 text-text-muted text-sm">
                  We are not responsible for the privacy practices of these
                  third parties.
                </p>
              </Section>

              <Section id="children" title="9. Children's Privacy">
                <p>
                  Washzy is <Strong>not</Strong> intended for children under 13
                  years of age. We do not knowingly collect personal
                  information from children. If we discover that a child under
                  13 has provided us with personal information, we will delete
                  it immediately.
                </p>
                <p className="mt-3">
                  If you believe your child has provided us with personal
                  information, please contact us at <MailLink />.
                </p>
              </Section>

              <Section id="international" title="10. International Data Transfers">
                <p>
                  Your information may be transferred to and stored on servers
                  located outside your country of residence. By using Washzy,
                  you consent to the transfer of your information to countries
                  that may have different data protection laws.
                </p>
              </Section>

              <Section id="changes" title="11. Changes to This Privacy Policy">
                <p>
                  We may update this Privacy Policy from time to time to
                  reflect changes in our practices or legal requirements. We
                  will notify you of significant changes through:
                </p>
                <List>
                  <Item>In-app notifications.</Item>
                  <Item>Email notifications (if provided).</Item>
                  <Item>Updated “Effective Date” at the top of this policy.</Item>
                </List>
                <p className="mt-2">
                  Continued use of the app after changes indicates your
                  acceptance of the updated policy.
                </p>
              </Section>

              <Section id="contact" title="12. Contact Us">
                <ContactCard />
              </Section>
            </DocumentBlock>

            <DocumentBlock kind="terms">
              <SectionHeader
                eyebrow="Part II"
                title="Terms & Conditions for Washzy"
                lead="By downloading, installing, or using the Washzy mobile application, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the app."
              />

              <Section id="service-description" title="1. Service Description">
                <p>
                  Washzy is a mobile application that connects customers with
                  car wash service stations. We provide:
                </p>
                <List>
                  <Item>Location-based search for nearby car wash stations.</Item>
                  <Item>Online booking and scheduling.</Item>
                  <Item>Digital wallet for payments.</Item>
                  <Item>Booking management and history.</Item>
                  <Item>Push notifications for service updates.</Item>
                </List>
              </Section>

              <Section id="eligibility" title="2. User Eligibility">
                <List>
                  <Item>
                    You must be at least <Strong>18 years old</Strong> to use
                    Washzy.
                  </Item>
                  <Item>
                    You must provide accurate and complete information during
                    registration.
                  </Item>
                  <Item>
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </Item>
                  <Item>
                    One account per user — multiple accounts are prohibited.
                  </Item>
                </List>
              </Section>

              <Section id="user-responsibilities" title="3. User Responsibilities">
                <p>As a user, you agree to:</p>
                <List>
                  <Item label="Provide Accurate Information">
                    Keep your profile, vehicle, and contact details up to date.
                  </Item>
                  <Item label="Maintain Account Security">
                    Protect your phone number and OTP codes.
                  </Item>
                  <Item label="Use Services Lawfully">
                    Comply with all applicable laws and regulations.
                  </Item>
                  <Item label="Respect Service Providers">
                    Treat car wash station staff with courtesy.
                  </Item>
                  <Item label="Avoid Misuse">
                    Do not abuse, spam, or exploit the platform.
                  </Item>
                  <Item label="No Fraudulent Activity">
                    Do not engage in payment fraud, fake bookings, or
                    chargebacks.
                  </Item>
                </List>
              </Section>

              <Section id="bookings" title="4. Bookings and Cancellations">
                <SubSection title="4.1 Booking Process">
                  <List>
                    <Item>
                      Bookings are confirmed only after successful payment
                      deduction from your wallet.
                    </Item>
                    <Item>
                      You will receive a booking confirmation with a unique
                      booking ID.
                    </Item>
                    <Item>
                      Arrival verification may be required via OTP at the
                      service station.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="4.2 Cancellation Policy">
                  <List>
                    <Item>
                      You may cancel bookings according to the station's
                      cancellation policy.
                    </Item>
                    <Item>
                      Refunds (if applicable) will be credited to your Washzy
                      wallet.
                    </Item>
                    <Item>
                      Repeated cancellations may result in account
                      restrictions.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="4.3 No-Show Policy">
                  <List>
                    <Item>
                      Failure to arrive for a confirmed booking may result in
                      forfeiture of payment.
                    </Item>
                    <Item>
                      Repeated no-shows may lead to account suspension.
                    </Item>
                  </List>
                </SubSection>
              </Section>

              <Section id="wallet" title="5. Wallet and Payments">
                <SubSection title="5.1 Wallet Top-Up">
                  <List>
                    <Item>
                      Add funds to your Washzy wallet using Razorpay payment
                      gateway.
                    </Item>
                    <Item>
                      Supported payment methods: Credit/Debit Cards, UPI, Net
                      Banking, Wallets.
                    </Item>
                    <Item>Minimum top-up amount may apply.</Item>
                  </List>
                </SubSection>
                <SubSection title="5.2 Payment Processing">
                  <List>
                    <Item>
                      All payments are processed securely through Razorpay.
                    </Item>
                    <Item>
                      Booking amounts are deducted from your wallet balance.
                    </Item>
                    <Item>
                      Insufficient wallet balance will prevent booking
                      confirmation.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="5.3 Refunds">
                  <List>
                    <Item>
                      Refunds (if applicable) are credited to your Washzy
                      wallet within 5–7 business days.
                    </Item>
                    <Item>
                      Refunds to original payment method are not supported.
                    </Item>
                    <Item>
                      Refund eligibility is subject to service verification and
                      station policies.
                    </Item>
                  </List>
                </SubSection>
                <SubSection title="5.4 Wallet Balance">
                  <List>
                    <Item>Wallet balance does not expire.</Item>
                    <Item>
                      Wallet balance is non-transferable and cannot be
                      withdrawn as cash.
                    </Item>
                    <Item>
                      Upon account deletion, remaining wallet balance will be
                      forfeited.
                    </Item>
                  </List>
                </SubSection>
              </Section>

              <Section id="pricing" title="6. Pricing and Fees">
                <List>
                  <Item>
                    Service prices are set by individual car wash stations.
                  </Item>
                  <Item>
                    Prices displayed in the app are inclusive of applicable
                    taxes.
                  </Item>
                  <Item>
                    Washzy may charge a convenience fee or service fee (if
                    applicable).
                  </Item>
                  <Item>Prices are subject to change without prior notice.</Item>
                  <Item>
                    Promotional offers and discounts are subject to terms and
                    conditions.
                  </Item>
                </List>
              </Section>

              <Section id="ip" title="7. Intellectual Property">
                <p>
                  All content, features, and functionality of the Washzy app
                  are owned by Washzy and protected by copyright, trademark,
                  and other intellectual property laws.
                </p>
                <p className="mt-3">You may NOT:</p>
                <List>
                  <Item>Copy, modify, or distribute app content.</Item>
                  <Item>Reverse engineer or decompile the app.</Item>
                  <Item>
                    Use Washzy branding, logos, or trademarks without
                    permission.
                  </Item>
                  <Item>Create derivative works based on the app.</Item>
                </List>
              </Section>

              <Section id="termination" title="8. Account Suspension and Termination">
                <p>
                  We reserve the right to suspend or terminate your account if
                  you:
                </p>
                <List>
                  <Item>Violate these Terms & Conditions.</Item>
                  <Item>Engage in fraudulent or illegal activities.</Item>
                  <Item>Abuse or misuse the platform.</Item>
                  <Item>Provide false or misleading information.</Item>
                  <Item>Repeatedly cancel bookings or fail to show up.</Item>
                </List>
                <p className="mt-3">Upon termination:</p>
                <List>
                  <Item>You will lose access to your account and wallet balance.</Item>
                  <Item>Pending bookings may be cancelled.</Item>
                  <Item>You may be prohibited from creating a new account.</Item>
                </List>
              </Section>

              <Section id="liability" title="9. Limitation of Liability">
                <p>
                  To the fullest extent permitted by law, Washzy shall{" "}
                  <Strong>not</Strong> be liable for:
                </p>
                <SubSection title="9.1 Service Interruptions">
                  <List>
                    <Item>App downtime, server outages, or technical issues.</Item>
                    <Item>Inability to access the app due to network connectivity.</Item>
                  </List>
                </SubSection>
                <SubSection title="9.2 Third-Party Failures">
                  <List>
                    <Item>Payment gateway failures or delays.</Item>
                    <Item>Car wash station service quality or availability.</Item>
                    <Item>Third-party service provider errors.</Item>
                  </List>
                </SubSection>
                <SubSection title="9.3 User Negligence">
                  <List>
                    <Item>Loss or theft of your device.</Item>
                    <Item>Unauthorized access due to sharing your credentials.</Item>
                    <Item>Failure to maintain accurate account information.</Item>
                  </List>
                </SubSection>
                <SubSection title="9.4 Indirect Damages">
                  <List>
                    <Item>Loss of profits, data, or business opportunities.</Item>
                    <Item>Incidental, consequential, or punitive damages.</Item>
                  </List>
                </SubSection>
                <Callout tone="info">
                  <Strong>Maximum Liability:</Strong> Our total liability to
                  you for any claims arising from the use of Washzy shall not
                  exceed the amount you paid to Washzy in the 12 months
                  preceding the claim.
                </Callout>
              </Section>

              <Section id="warranties" title="10. Disclaimer of Warranties">
                <p>
                  Washzy is provided on an <Strong>“AS IS”</Strong> and{" "}
                  <Strong>“AS AVAILABLE”</Strong> basis without warranties of
                  any kind, either express or implied, including but not
                  limited to:
                </p>
                <List>
                  <Item>Merchantability or fitness for a particular purpose.</Item>
                  <Item>Accuracy, reliability, or completeness of content.</Item>
                  <Item>Uninterrupted or error-free operation.</Item>
                  <Item>Security or freedom from viruses.</Item>
                </List>
              </Section>

              <Section id="indemnification" title="11. Indemnification">
                <p>
                  You agree to indemnify, defend, and hold harmless Washzy,
                  its officers, directors, employees, and agents from any
                  claims, liabilities, damages, losses, or expenses (including
                  legal fees) arising from:
                </p>
                <List>
                  <Item>Your use or misuse of the app.</Item>
                  <Item>Violation of these Terms & Conditions.</Item>
                  <Item>Violation of any third-party rights.</Item>
                  <Item>Fraudulent or illegal activities.</Item>
                </List>
              </Section>

              <Section id="disputes" title="12. Dispute Resolution">
                <SubSection title="12.1 Governing Law">
                  <p>
                    These Terms & Conditions are governed by the laws of India.
                  </p>
                </SubSection>
                <SubSection title="12.2 Jurisdiction">
                  <p>
                    Any disputes arising from these terms shall be subject to
                    the exclusive jurisdiction of the courts in [Your
                    City/State, India].
                  </p>
                </SubSection>
                <SubSection title="12.3 Arbitration">
                  <p>
                    Before filing a lawsuit, you agree to attempt to resolve
                    disputes through good-faith negotiation. If unresolved,
                    disputes may be submitted to binding arbitration.
                  </p>
                </SubSection>
              </Section>

              <Section id="terms-changes" title="13. Changes to Terms & Conditions">
                <p>
                  We may update these Terms & Conditions at any time. Changes
                  will be effective immediately upon posting in the app. We
                  will notify you of significant changes through:
                </p>
                <List>
                  <Item>In-app notifications.</Item>
                  <Item>Email notifications (if provided).</Item>
                  <Item>Updated “Effective Date” at the top of this document.</Item>
                </List>
                <p className="mt-2">
                  Continued use of the app after changes indicates your
                  acceptance of the updated terms.
                </p>
              </Section>

              <Section id="severability" title="14. Severability">
                <p>
                  If any provision of these Terms & Conditions is found to be
                  invalid or unenforceable, the remaining provisions shall
                  remain in full force and effect.
                </p>
              </Section>

              <Section id="terms-contact" title="15. Contact Information">
                <ContactCard />
              </Section>
            </DocumentBlock>

            <div className="rounded-card bg-navy-900 text-white p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">
                Acknowledgement
              </p>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-navy-50/90">
                By using Washzy, you acknowledge that you have read,
                understood, and agree to be bound by this Privacy Policy and
                Terms & Conditions.
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

function DocumentBlock({
  kind,
  children,
}: {
  kind: "privacy" | "terms";
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-card bg-white shadow-card p-8 md:p-12"
      data-doc={kind}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="border-b border-border pb-8 mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-navy-900 tracking-tight">
        {title}
      </h2>
      <p className="mt-4 text-base text-text-muted leading-relaxed">{lead}</p>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-10 last:mb-0">
      <h3 className="text-xl font-semibold text-navy-900 mb-4">{title}</h3>
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-text-strong">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-700 mb-2">
        {title}
      </h4>
      <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-strong">
        {children}
      </div>
    </div>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-2 pl-1">{children}</ul>;
}

function Item({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
      />
      <span>
        {label ? <Strong>{label}: </Strong> : null}
        {children}
      </span>
    </li>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-navy-900">{children}</span>;
}

function ExtLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-700 hover:text-teal-900 underline underline-offset-2 decoration-teal-500/40 hover:decoration-teal-700 transition-colors"
    >
      {children}
    </a>
  );
}

function MailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

function Callout({
  tone,
  children,
}: {
  tone: "info" | "success" | "warning";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-navy-50 border-navy-500/30 text-navy-900",
    success: "bg-teal-50 border-teal-500/30 text-navy-900",
    warning: "bg-accent-300/15 border-accent-500/40 text-accent-text",
  }[tone];
  return (
    <div className={`rounded-xl border px-4 py-3 text-[14.5px] leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

function PermissionCard({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-muted p-5">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
        {title}
      </h4>
      <dl className="mt-3 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-semibold text-teal-700">{k}</dt>
            <dd className="text-text-strong">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-teal-50 to-navy-50 border border-teal-500/20 p-6">
      <p className="text-sm">
        If you have questions, concerns, or requests, please contact us:
      </p>
      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="font-semibold text-navy-900">Email</dt>
        <dd><MailLink /></dd>
        <dt className="font-semibold text-navy-900">App Name</dt>
        <dd className="text-text-strong">Washzy</dd>
        <dt className="font-semibold text-navy-900">Service</dt>
        <dd className="text-text-strong">Car Wash Booking Application</dd>
      </dl>
    </div>
  );
}
