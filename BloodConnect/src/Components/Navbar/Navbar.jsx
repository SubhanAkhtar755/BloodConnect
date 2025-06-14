import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-[#767879] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl text-[#0866ff] font-bold tracking-wider flex items-center"
        >
          <span className="mr-2">🩸</span> BloodConnect
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <Link to="/search" className="hover:text-red-600 transition">Find Donor</Link>
          <Link to="/add-donor" className="hover:text-red-600 transition">Add Donor</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Animated Mobile Menu using Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-red-700 text-white flex flex-col px-4 pb-4 space-y-3 font-medium overflow-hidden"
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/search" onClick={() => setMenuOpen(false)}>Find Donor</Link>
            <Link to="/add-donor" onClick={() => setMenuOpen(false)}>Add Donor</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
