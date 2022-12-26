import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAeUU6ARe9MHKV3fAXJ0LTJQd4pRAf8KF4",
  authDomain: "ecommercereact-a638f.firebaseapp.com",
  projectId: "ecommercereact-a638f",
  storageBucket: "ecommercereact-a638f.appspot.com",
  messagingSenderId: "496153512036",
  appId: "1:496153512036:web:cf0ede395316aa69c0b771",
  measurementId: "G-1DVBZ3MQFG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  //   console.log(userDocRef);

  const userSnapschot = await getDoc(userDocRef);
  //   console.log(userSnapschot.exists());

  if (!userSnapschot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};