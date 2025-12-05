import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        // Check if user is authorized admin
        const authorizedAdmins = [
          "admin@yourportfolio.com", // Default admin email
          "abrhamasrat29@gmail.com", // User's email from memory
        ];

        if (authorizedAdmins.includes(user.email)) {
          setLoading(false);
        } else {
          // Not an authorized admin, redirect to unauthorized page or login
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
