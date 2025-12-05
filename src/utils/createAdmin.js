// Utility script to create the initial admin account
// This should be run once to set up the admin account

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const createAdminAccount = async () => {
  // These should be replaced with your actual admin credentials
  const adminEmail = "abrhamasrat29@gmail.com"; // Using your email from memory
  const adminPassword = "SecurePass123!"; // Replace with a strong password

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );
    console.log("✅ Admin account created successfully!");
    console.log("👤 User ID:", userCredential.user.uid);
    console.log("📧 Email:", userCredential.user.email);
    console.log(
      "\n🎉 You can now log in to the admin panel with these credentials."
    );
    console.log(
      "⚠️  Remember to change the password after first login for security."
    );
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("ℹ️  Admin account already exists.");
    } else if (error.code === "auth/invalid-email") {
      console.log("❌ Invalid email address.");
    } else if (error.code === "auth/weak-password") {
      console.log("❌ Password should be at least 6 characters.");
    } else {
      console.log("❌ Error creating admin account:", error.message);
    }
  }
};

// Run the function
createAdminAccount();

export default createAdminAccount;
