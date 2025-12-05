// Script to create an admin user in Firebase
// Run this once to create your admin account

import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const setupAdminAccount = async () => {
  const adminEmail = "admin@yourportfolio.com"; // Change this to your preferred email
  const adminPassword = "securePassword123"; // Change this to a strong password

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );
    console.log("Admin account created successfully!");
    console.log("User UID:", userCredential.user.uid);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Admin account already exists.");
    } else {
      console.error("Error creating admin account:", error.message);
    }
  }
};

// Uncomment the line below to run the setup
// setupAdminAccount();

export default setupAdminAccount;
