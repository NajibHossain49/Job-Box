import React, { useContext, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/Animation-Login.json";
import { Link } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    // Check if both fields are filled
    if (!username || !password) {
      setFormError("Please fill out both fields.");
      setError(null);
    } else {
      setFormError(null);
      // Sign in a user with an email address and password
      signIn(username, password)
        .then((result) => {
          console.log("SignIn-User", result.user);
          alert(`Login Successful\nUsername: ${username}`);
          form.reset();
          setError(null);
        })
        .catch((error) => {
          console.error("Error-Message", error);
          setError("Invalid credentials, please try again.");
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-neutral-200">
          <div className="p-8 space-y-6">
            {/* Lottie Animation */}
            <div className="flex justify-center mb-6">
              <Player autoplay loop src={animationData} className="h-40 w-40" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-center text-3xl font-bold text-neutral-800 mb-4">
                Login
              </h2>

              {/* Username Input */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition duration-300"
              />

              {/* Password Input */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition duration-300"
              />

              {/* Error Message for Missing Fields */}
              {formError && (
                <div className="text-red-500 text-center mt-2">{formError}</div>
              )}

              {/* Error Message for Invalid Credentials */}
              {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-teal-600 transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              >
                Log In
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-neutral-600 hover:text-emerald-700 text-sm transition duration-300"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {/* Sign Up Option */}
        <div className="text-center mt-6 text-neutral-600">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
