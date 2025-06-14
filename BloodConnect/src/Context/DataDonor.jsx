// src/context/DonorContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Config/Firebase";

const DonorContext = createContext();

export const DataDonor = ({ children }) => {
  const [donors, setDonors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔴 DONORS
    const unsubscribeDonors = onSnapshot(
      collection(db, "donors"),
      (snapshot) => {
        const donorData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDonors(donorData);
        console.log("Donors Fetched:", donorData); // ✅ Log
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching donors:", error);
        setLoading(false);
      }
    );

    // 🔵 REVIEWS
    const unsubscribeReviews = onSnapshot(
      collection(db, "reviews"),
      (snapshot) => {
        const reviewData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReviews(reviewData);
        console.log("Reviews Fetched:", reviewData); // ✅ Log
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );

    // ✅ Unsubscribe both listeners on unmount
    return () => {
      unsubscribeDonors();
      unsubscribeReviews();
    };
  }, []);

  return (
    <DonorContext.Provider value={{ donors, reviews, loading }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonorContext = () => useContext(DonorContext);
