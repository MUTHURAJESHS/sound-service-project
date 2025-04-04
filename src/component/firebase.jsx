// Create a new file called firebase.js in your src directory
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project details
const firebaseConfig = {
    apiKey: "AIzaSyDake1MnOmksgrs5wIQe3mcOtfswyAuhFs",
    authDomain: "my-first-project-757f1.firebaseapp.com",
    projectId: "my-first-project-757f1",
    storageBucket: "my-first-project-757f1.firebasestorage.app",
    messagingSenderId: "925535287248",
    appId: "1:925535287248:web:f26b33cac92bf0d6c06bd5",
    measurementId: "G-HQ7WDKGSDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth for use in components
export const auth = getAuth(app);
export default app;