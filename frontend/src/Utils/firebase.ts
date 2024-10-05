// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCagjmI4mZdA_ZoAx0T_kpjXnYsNUvxm2g",
  authDomain: "hackthevalley-8b71c.firebaseapp.com",
  projectId: "hackthevalley-8b71c",
  storageBucket: "hackthevalley-8b71c.appspot.com",
  messagingSenderId: "813783062225",
  appId: "1:813783062225:web:bf56a3b2a600cf6f6417f0",
  measurementId: "G-5BFLJL6KFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const currentUser = auth.currentUser;

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);


export namespace FirebaseServices {

  export const get_user = async () => {
    const user = auth.currentUser
    if (user) {
      return user
    }
    return false
  }

  export const is_logged_in = async () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          resolve(true);
        } else {
          // No user is signed in.
          resolve(false);
        }
  
        // Clean up the subscription after resolving the Promise
        unsubscribe();
      });
    });
  };

  export const sign_out = async () => {
    auth.signOut()
  }

}