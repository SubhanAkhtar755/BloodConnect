import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  setDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
  enableIndexedDbPersistence, // ⬅️ Import this
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes
} from "firebase/storage";

// 🔐 Your Firebase config (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyCpRWbZZwRnsonu7H97k-ralAnJtvF5sJE",
  authDomain: "blood-1351f.firebaseapp.com",
  projectId: "blood-1351f",
  storageBucket: "blood-1351f.firebasestorage.app",
  messagingSenderId: "234122473667",
  appId: "1:234122473667:web:651118260c8d27b3057276"
};

// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 📦 Firestore & Storage Instances
const db = getFirestore(app);

// ✅ Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn("Offline persistence failed: Multiple tabs open");
  } else if (err.code === 'unimplemented') {
    console.warn("Offline persistence is not supported in this browser");
  } else {
    console.error("Error enabling offline persistence:", err);
  }
});

const storage = getStorage(app);

// 🛠 Export everything needed for usage in other files
export {
  db,
  storage,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  query,
  where,
  getDoc,
  setDoc,
  uploadBytes,
  orderBy,
  onSnapshot,
  serverTimestamp
};