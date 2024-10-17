import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyCiy9Q-MPXML77PE5oW0K7dj3Hc1lY1eu0",
  authDomain: "ideaforge-5cd44.firebaseapp.com",
  projectId: "ideaforge-5cd44",
  storageBucket: "ideaforge-5cd44.appspot.com",
  messagingSenderId: "582683138625",
  appId: "1:582683138625:web:5adbd71bb7c183c86784c0",
  measurementId: "G-QM38BC88HJ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth, analytics };
