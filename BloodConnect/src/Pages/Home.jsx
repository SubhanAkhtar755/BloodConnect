import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { collection, addDoc, serverTimestamp, db } from "../Config/Firebase";
import { useDonorContext } from "../Context/DataDonor";
import { Link } from "react-router-dom";

const REVIEWS_PER_PAGE = 2;

const Home = () => {
  const { reviews, fetchReviews } = useDonorContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 0, text: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text || formData.rating === 0) {
      alert("Please fill all fields and provide a rating.");
      return;
    }

    const newReview = {
      ...formData,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "reviews"), newReview);
      await fetchReviews();
      setCurrentPage(1); // Go back to first page
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      // ✅ Always reset form — even if there's an error
      setFormData({ name: "", rating: 0, text: "" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate(); // Firestore Timestamp → JS Date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#fefefe] py-10 px-4 sm:px-8">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-red-700 mb-6 leading-tight">
              Donate Blood, Save Lives
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Every drop counts. Blood donations help patients undergoing
              surgeries, fighting cancer, and surviving accidents.
            </p>
            <p className="text-base text-gray-600">
              Become a hero in just 30 minutes. One donation can impact up to
              three lives. Join the mission today!
            </p>
          </div>
          <img
            src="https://metrohospitals.com/wp-content/uploads/2024/01/World-Blood-Donor-DayDonate-blood-save-lives.jpg"
            alt="Blood Donation"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-red-700 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Step 1: Register",
                desc: "Enter your blood group, location, and contact. Quick & secure.",
                icon: "https://cdn-icons-png.flaticon.com/512/3011/3011270.png",
              },
              {
                title: "Step 2: Donate",
                desc: "Visit a center or respond to a nearby request.",
                icon: "https://cdn-icons-png.flaticon.com/512/3011/3011297.png",
              },
              {
                title: "Step 3: Save Lives",
                desc: "One donation can save up to three lives.",
                icon: "https://cdn-icons-png.flaticon.com/512/3159/3159478.png",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-20 h-20 mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-red-700 text-center mb-8">
            Who Can Donate?
          </h2>
          <ul className="list-disc text-gray-700 space-y-3 text-lg pl-6">
            <li>Minimum age: 17 years (16 with parental consent)</li>
            <li>Weight should be at least 50 kg (110 lbs)</li>
            <li>You must be in good general health</li>
            <li>Wait 56 days between blood donations</li>
            <li>No tattoos/piercings in the last 3 months (unless sterile)</li>
            <li>Bring valid ID and stay hydrated before donating</li>
          </ul>
        </div>
      </section>

      {/* Compatibility Table */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-red-700 text-center mb-10">
            Blood Type Compatibility
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-center">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Can Receive From</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  ["A+", "A+, A-, O+, O-"],
                  ["A-", "A-, O-"],
                  ["B+", "B+, B-, O+, O-"],
                  ["B-", "B-, O-"],
                  ["AB+", "All types"],
                  ["AB-", "AB-, A-, B-, O-"],
                  ["O+", "O+, O-"],
                  ["O-", "O-"],
                ].map(([type, compatible], i) => (
                  <tr key={i} className="border-t border-gray-300">
                    <td className="py-3 px-4 font-semibold">{type}</td>
                    <td className="py-3 px-4">{compatible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-red-700 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {[
              {
                q: "Is it safe to donate blood?",
                a: "Yes. All equipment used is sterile and single-use only.",
              },
              {
                q: "How often can I donate?",
                a: "Every 56 days for whole blood. Platelets and plasma may differ.",
              },
              {
                q: "Does blood donation hurt?",
                a: "Only a slight pinch when the needle goes in, then you're good!",
              },
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="text-xl font-semibold text-red-600 mb-1">
                  {faq.q}
                </h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Save a Life?</h2>
          <p className="text-lg mb-6">
            Join our blood donation network and be a hero for those in need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={"/add-donor"}>
              {" "}
              <a className="bg-white text-red-600 font-semibold px-6 py-3 rounded hover:bg-red-100 transition">
                Register as Donor
              </a>
            </Link>
            <Link to={"/search"}>
              {" "}
              <a className="bg-red-700 font-semibold px-6 py-3 rounded hover:bg-red-800 transition">
                Search for Donors
              </a>
            </Link>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#d60000]">
          Blood Donation Portal
        </h1>

        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#d60000] hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg transition"
          >
            Read/Add Reviews
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-[#d60000] text-white px-5 py-3 rounded-full shadow-lg hover:bg-red-700 transition z-50"
      >
        Reviews
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-6 backdrop-blur-sm relative shadow-xl">
            <button
              className="absolute top-1 right-1 text-gray-600 hover:text-red-600 text-xl font-bold"
              onClick={() => {
                setIsModalOpen(false);
                setFormData({ name: "", rating: 0, text: "" }); // <-- Reset on modal close
              }}
            >
              ×
            </button>
            {/* Review Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />

              <textarea
                name="text"
                placeholder="Write your review..."
                value={formData.text}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={2}
              />

              <div className="flex items-center space-x-2">
                <span className="text-sm">Your Rating:</span>
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    className={`cursor-pointer ${
                      formData.rating >= num
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRating(num)}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="bg-[#d60000] text-white px-6 py-2 rounded hover:bg-red-700 transition w-full"
              >
                Submit Review
              </button>
            </form>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Donor Reviews
            </h2>
            <p className="text-center text-sm text-gray-600 mb-4">
              {reviews.length} review{reviews.length !== 1 && "s"} total
            </p>

            {/* Reviews List */}
            <div className="max-h-60 overflow-y-auto space-y-4 mb-4 px-2">
              {paginatedReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="relative border rounded-lg p-3 shadow-sm bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-semibold text-gray-700">
                        {rev.name}
                      </span>
                    </div>
                    <div className="flex">
                      {[...Array(rev.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm pr-10">{rev.text}</p>

                  {/* Date in bottom right corner INSIDE the box */}
                  <span className="absolute bottom-0 right-1 text-xs text-gray-400">
                    ({formatDate(rev.createdAt)})
                  </span>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {reviews.length > 3 && (
              <div className="flex justify-between items-center mb-4">
                <button
                  disabled={currentPage === 1}
                  onClick={handlePrevious}
                  className={`px-4 py-2 rounded bg-gray-200 text-sm ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={handleNext}
                  className={`px-4 py-2 rounded bg-gray-200 text-sm ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
