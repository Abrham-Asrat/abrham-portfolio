import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

// Your web app's Firebase configuration (REPLACE WITH YOUR OWN CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyAxxKpDU_NaIqL351w2NK869oNE_SmZ4HI",
  authDomain: "myportfolio-ae939.firebaseapp.com",
  projectId: "myportfolio-ae939",
  storageBucket: "myportfolio-ae939.firebasestorage.app",
  messagingSenderId: "699421095530",
  appId: "1:699421095530:web:727ff6fd6c9af18f1e7c13",
  measurementId: "G-JP5K647LNF",
};
// Initialize with a unique name
const app = initializeApp(firebaseConfig, "comments-app");
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
