// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAZeSt-S8eMZvBWFXb-KtZV6au39VRzVvk",
  authDomain: "learning-tracker-5fedc.firebaseapp.com",
  projectId: "learning-tracker-5fedc",
  storageBucket: "learning-tracker-5fedc.firebasestorage.app",
  messagingSenderId: "471479802486",
  appId: "1:471479802486:web:75c8ef94524d0a24fb5d57",
  measurementId: "G-DE9F6N2LY2"
};

// 🔌 Connect to Firebase
const app = initializeApp(firebaseConfig);

// 🗃 Connect to Firestore
const db = getFirestore(app);

// 📤 Export Firestore so you can use it elsewhere
export { db };
