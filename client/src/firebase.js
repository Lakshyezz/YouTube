// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRw1A3htR7MOtLZNlVy8gw8RmJAhVDG4o",
  authDomain: "video-cf8cf.firebaseapp.com",
  projectId: "video-cf8cf",
  storageBucket: "video-cf8cf.appspot.com",
  messagingSenderId: "559641755480",
  appId: "1:559641755480:web:026f86bf5c3540ab082f2d",
  measurementId: "G-PC9B1HJD1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
