// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Add Firestore functions
import Firebase_config from "../secrets.json";

// Your web app's Firebase configuration
const firebaseConfig = Firebase_config.Firebase_Config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt: "select_account"
});

export const auth = getAuth();
export const db = getFirestore(app);

// Function to handle Google sign-in and Firestore user creation
export const signInWithGooglePopup = async () => {
  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Reference to the user document in Firestore
    const userRef = doc(db, "users", user.uid);

    // Check if the user already exists in Firestore
    const userDoc = await getDoc(userRef);

    // If the user doesn't exist, create a new document
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
      console.log("User added to Firestore!");
    } else {
      console.log("User already exists in Firestore.");
    }
  } catch (error) {
    console.error("Error logging in or adding user to Firestore:", error);
  }
};

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to 'local'.");
  })
  .catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });

// Current user
export const currentUser = auth.currentUser;

// FirebaseServices namespace for additional services
export namespace FirebaseServices {

  export const get_user = async () => {
    const user = auth.currentUser
    if (user) {
      return user;
    }
    return false;
  };

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
    auth.signOut();
  };
}
