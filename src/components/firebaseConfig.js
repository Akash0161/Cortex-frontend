// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOVVLWRCtJRYJv5L6EcOk0VyCWkxFOt3w",
  authDomain: "blog-71bce.firebaseapp.com",
  projectId: "blog-71bce",
  storageBucket: "blog-71bce.firebasestorage.app",
  messagingSenderId: "394441292474",
  appId: "1:394441292474:web:eefcb8be5cb25e406fa083",
  measurementId: "G-WM4V4PB7WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const provider = new GoogleAuthProvider()

export {auth, provider}