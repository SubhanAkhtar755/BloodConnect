import { useState } from "react";
import "./Support.css"; // or Support.module.css with appropriate import syntax

const faqs = [
  {
    question: "How do I become a blood donor?",
    answer:
      "Click on the 'Register as Donor' button and fill out the form with your name, blood group, contact details, and availability. Once registered, your profile will be visible to those in need.",
  },
  {
    question: "Is there any cost to register as a donor?",
    answer:
      "No, registration is completely free. We aim to connect donors and patients without any financial burden.",
  },
  {
    question: "How will I be contacted if someone needs blood?",
    answer:
      "If your blood group and location match a request, you will be contacted via phone, WhatsApp, or email — based on the contact method you provided.",
  },
  {
    question: "Can I hide my donor profile after registration?",
    answer:
      "Yes, you can mark yourself as 'Not Available' from your dashboard if you're currently unable to donate.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Absolutely. Your data is stored securely and only shared with verified recipients or hospitals in case of a match.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="faq-item">
    <button
      onClick={onClick}
      className="faq-question-button"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${faq.question.replace(/\s+/g, '-')}`}
    >
      {faq.question}
      <span className="faq-icon">{isOpen ? "−" : "+"}</span>
    </button>
    {isOpen && (
      <p
        id={`faq-answer-${faq.question.replace(/\s+/g, '-')}`}
        className="faq-answer"
      >
        {faq.answer}
      </p>
    )}
  </div>
);

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="support-container">
      <h1 className="support-title">Support</h1>

      <section className="mb-10">
        <h2 className="section-title">Contact Us</h2>
        <p className="text-gray-700 mb-2">
          Have questions about donor registration, blood requests, or safety? Contact us below:
        </p>
        <ul className="">
          <li>
            Email:{" "}
            <a href="mailto:muhammadsubhan192128@gmail.com" className="text-link">
              muhammadsubhan192128@gmail.com
            </a>
          </li>
          <li>
            WhatsApp: <span className="text-link">+92-326-0803755</span> (9 AM – 9 PM)
          </li>
          
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Response Time</h2>
        <p className="response-time">
          Our team responds within 12–24 hours. Your support helps save lives — thank you!
        </p>
      </section>
    </main>
  );
};

export default Support;
