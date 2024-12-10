import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";

import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(); // Initialize Firebase Auth instance

  // Create a password-based account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Observe user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current-User", currentUser);
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    user,
    createUser,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
