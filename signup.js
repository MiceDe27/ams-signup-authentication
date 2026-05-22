import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZjh1zkTIGOGDszq6O7s2_n1LVTGd-3U0",
  authDomain: "ams-project-8fd8a.firebaseapp.com",
  projectId: "ams-project-8fd8a",
  storageBucket: "ams-project-8fd8a.firebasestorage.app",
  messagingSenderId: "947636452428",
  appId: "1:947636452428:web:301d8d5cca57705fb4c8e9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signupBtn = document.getElementById('google-signup');

if (signupBtn) {
    signupBtn.addEventListener('click', async () => {
        signupBtn.innerText = "Connecting to Google...";
        signupBtn.disabled = true;
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            
            if (result && result.user) {
                const idToken = await result.user.getIdToken(true);
                
                localStorage.setItem('token', idToken);
                
                alert("Registration successful! Redirecting to main login portal...");
                window.location.href = "http://localhost:5173/";
            }
        } catch (error) {
            console.error("Popup registration error:", error);
            alert("Error during registration: " + error.message);
            
            signupBtn.innerText = "Sign Up with Google";
            signupBtn.disabled = false;
        }
    });
}