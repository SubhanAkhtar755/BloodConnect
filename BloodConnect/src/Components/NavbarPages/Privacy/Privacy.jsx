import './Privacy.css';

const Privacy = () => (
  <main className="privacy-main">
    <h1 className="privacy-title">Privacy Policy</h1>

    <p className="privacy-text">
      At <span className="privacy-highlight">BloodConnect</span>, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you register, donate, or engage with our blood donation services.
    </p>

    <h2 className="privacy-subtitle">1. Information We Collect</h2>
    <ul className="privacy-list">
      <li>Personal information such as name, phone number, and blood group</li>
      <li>Location details to connect donors with nearby recipients</li>
      <li>Email address for communication and donation reminders</li>
      <li>Donation history and availability status</li>
      <li>IP address and device/browser type for analytics and security</li>
    </ul>

    <h2 className="privacy-subtitle">2. How We Use Your Information</h2>
    <ul className="privacy-list">
      <li>To connect eligible donors with individuals or hospitals in need</li>
      <li>To notify you about urgent blood requirements (if you opt in)</li>
      <li>To improve the functionality and user experience of our platform</li>
      <li>To maintain safety, prevent fraud, and protect user data</li>
    </ul>

    <h2 className="privacy-subtitle">3. Cookies and Tracking</h2>
    <p className="privacy-text">
      We use cookies to remember your preferences, login sessions, and for basic analytics. You can control or disable cookies through your browser settings.
    </p>

    <h2 className="privacy-subtitle">4. Third-Party Services</h2>
    <p className="privacy-text">
      We may use trusted services like Firebase or Google Analytics to manage our app and track performance. These platforms follow their own privacy policies.
    </p>

    <h2 className="privacy-subtitle">5. Data Protection</h2>
    <p className="privacy-text">
      We use secure servers, encryption, and access control to keep your information safe. Your data is never sold or shared with advertisers or unauthorized third parties.
    </p>

    <h2 className="privacy-subtitle">6. Your Rights</h2>
    <ul className="privacy-list">
      <li>You can view, update, or delete your personal details at any time</li>
      <li>You can unsubscribe from notifications and alerts</li>
      <li>You may request complete deletion of your donor profile</li>
    </ul>

    <h2 className="privacy-subtitle">7. Changes to This Policy</h2>
    <p className="privacy-text">
      We may revise this Privacy Policy to reflect changes in our services. Please revisit this page periodically to stay informed.
    </p>

    <h2 className="privacy-subtitle">8. Contact Us</h2>
    <p className="privacy-text">
      For any questions about this Privacy Policy, reach out at{" "}
      <a href="mailto:muhammadsubhan192128@gmail.com" className="privacy-link">
        muhammadsubhan192128@gmail.com
      </a>.
    </p>

    <p className="privacy-last-update">Last updated: June 13, 2025</p>
  </main>
);

export default Privacy;
