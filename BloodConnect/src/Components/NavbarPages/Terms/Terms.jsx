import './Terms.css';
import { Link } from "react-router-dom";
const Terms = () => (
  <main className="terms-main">
    <h1 className="terms-title">Terms & Conditions</h1>

    <p className="terms-text">
      Welcome to <strong className="terms-highlight">BloodConnect</strong>. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before registering as a donor or making a request.
    </p>

    <h2 className="terms-subtitle">1. Acceptance of Terms</h2>
    <p className="terms-text">
      By using BloodConnect, you confirm that you have read, understood, and accepted these Terms & Conditions. If you do not agree, please do not register or use this platform.
    </p>

    <h2 className="terms-subtitle">2. Donor Eligibility</h2>
    <p className="terms-text">
      You must be at least 18 years old and in good health to register as a blood donor. It is your responsibility to provide accurate and honest medical and personal information.
    </p>

    <h2 className="terms-subtitle">3. Use of Platform</h2>
    <p className="terms-text">
      BloodConnect is designed to help connect blood donors with patients in need. You agree to use the platform only for lawful purposes and not to misuse donor or patient information.
    </p>

    <h2 className="terms-subtitle">4. Data Accuracy & Responsibility</h2>
    <p className="terms-text">
      Users must provide truthful and up-to-date information when registering or submitting requests. BloodConnect is not responsible for any incorrect information provided by users.
    </p>

    <h2 className="terms-subtitle">5. Privacy and Security</h2>
    <p className="terms-text">
      We take data protection seriously. Your personal information is only shared with authorized users (e.g., patients, hospitals) when there's a match. Read our{" "}
      <Link to="/privacy" className="terms-link">Privacy Policy</Link> for more details.
    </p>

    <h2 className="terms-subtitle">6. Prohibited Conduct</h2>
    <ul className="terms-list">
      <li>Registering with false or misleading information</li>
      <li>Requesting blood without a genuine need</li>
      <li>Using donor/patient contact details for harassment or spam</li>
      <li>Attempting to exploit the platform for commercial gain</li>
    </ul>

    <h2 className="terms-subtitle">7. Content & Profile Moderation</h2>
    <p className="terms-text">
      We reserve the right to suspend or remove any user account that violates these terms or is found to be engaging in unethical behavior.
    </p>

    <h2 className="terms-subtitle">8. Limitation of Liability</h2>
    <p className="terms-text">
      BloodConnect serves as a connector between donors and recipients. We do not guarantee availability, compatibility, or medical outcomes. Users are encouraged to consult certified medical professionals.
    </p>

    <h2 className="terms-subtitle">9. Changes to Terms</h2>
    <p className="terms-text">
      These terms may be updated from time to time. Continued use of BloodConnect after updates means you accept the latest version of these Terms & Conditions.
    </p>

    <h2 className="terms-subtitle">10. Contact Us</h2>
    <p className="terms-text">
      If you have any questions or concerns about these Terms, please reach out at{" "}
      <a href="mailto:muhammadsubhan192128@gmail.com" className="terms-link">
       muhammadsubhan192128@gmail.com
      </a>.
    </p>
  </main>
);

export default Terms;
