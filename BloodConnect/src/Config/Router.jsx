import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../Pages/Home";

import Navbar from "../Components/Navbar/Navbar";
import Privacy from "../Components/Navbarpages/Privacy/Privacy";
import Terms from "../Components/Navbarpages/terms/Terms";
import Support from "../Components/Navbarpages/Support/Support";
import Footer from "../Components/Footer/Footer";
import AddDonor from "../Pages/AddDonor";
import FindDonor from "../Pages/FindDonor";

// Custom wrapper to access location
const FooterConditionalWrapper = () => {
  const location = useLocation();

  // Define paths where footer should be hidden
  const noFooterPaths = ["/privacy", "/terms", "/support"];

  const hideFooter = noFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-donor" element={<AddDonor />} />
        <Route path="/search" element={<FindDonor />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

const Approuter = () => {
  return (
    <BrowserRouter>
      <FooterConditionalWrapper />
    </BrowserRouter>
  );
};

export default Approuter;
