import { useState, useEffect } from "react";
import {
  PhoneIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDonorContext } from "../Context/DataDonor";

const FindDonor = () => {
  const { donors, loading } = useDonorContext();
  const [filters, setFilters] = useState({ city: "", group: "", age: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredDonors = donors.filter((donor) => {
    return (
      (filters.city === "" || donor.city === filters.city) &&
      (filters.group === "" || donor.group === filters.group) &&
      (filters.age === "" || donor.age === Number(filters.age))
    );
  });

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentDonors = filteredDonors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDonors.length / cardsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Find Blood Donors
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Use filters to search for the right blood donor. Your one click can save a life!
          </p>
        </div>

       <div className="overflow-auto">
  <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-xl shadow-md w-full min-w-[800px]">
    <select
      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
      className="border border-gray-300 p-2 rounded min-w-[300px]"
      value={filters.city}
    >
      <option value="">All Cities</option>
      {[...new Set(donors.map((d) => d.city))].map((city, i) => (
        <option key={i} value={city}>{city}</option>
      ))}
    </select>

    <select
      onChange={(e) => setFilters({ ...filters, group: e.target.value })}
      className="border border-gray-300 p-2 rounded min-w-[300px]"
      value={filters.group}
    >
      <option value="">All Blood Groups</option>
      {[...new Set(donors.map((d) => d.group))].map((g, i) => (
        <option key={i} value={g}>{g}</option>
      ))}
    </select>

    <input
      type="number"
      min="18"
      max="60"
      placeholder="Filter by Age"
      className="border border-gray-300 p-2 rounded min-w-[300px]"
      value={filters.age}
      onChange={(e) => setFilters({ ...filters, age: e.target.value })}
    />

    <input
      placeholder={`Total Donors: ${donors.length}`}
      className="border border-gray-300 p-2 rounded min-w-[180px] bg-white text-center text-red-600 font-bold text-sm shadow"
      disabled
    />
  </div>
</div>


        {/* Donor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center col-span-full text-gray-500">
              Loading donors...
            </p>
          ) : currentDonors.length ? (
            currentDonors.map((donor, index) => (
              <div
                key={donor.id || index}
                className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition duration-300 flex"
              >
                <img
                  src={donor.img}
                  alt={donor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-500 mr-4"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-red-600">
                      {donor.name}
                    </h3>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {donor.group}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <UserIcon className="w-4 h-4" /> Age: {donor.age}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" /> {donor.city}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <PhoneIcon className="w-4 h-4" /> {donor.contact}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No donors match your filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-white border border-red-600 text-red-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Details / Caption */}
        <div className="bg-white p-6 rounded-xl shadow text-gray-700 leading-relaxed mt-6">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Why Donate Blood?
          </h2>
          <p className="mb-2">
            Every drop you donate can save up to three lives. Blood cannot be manufactured; it only comes from generous people like you.
          </p>
          <p>
            By becoming a donor, you’re becoming a hero. Make a difference today and inspire others to do the same.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FindDonor;
