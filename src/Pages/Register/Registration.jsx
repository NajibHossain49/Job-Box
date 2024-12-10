import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation.json";
import AuthContext from "../../Contexts/AuthContext";

const Registration = () => {
  const { createUser } = useContext(AuthContext);

  // Define available roles and their corresponding skills
  const roles = {
    developer: ["JavaScript", "React", "Node.js", "Python", "Java"],
    designer: ["Figma", "Photoshop", "Illustrator", "UI/UX", "Sketch"],
    manager: [
      "Leadership",
      "Project Management",
      "Agile",
      "Communication",
      "Team Building",
    ],
  };

  const [skills, setSkills] = useState([]);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    // Dynamically update skills dropdown based on selected role
    if (selectedRole) {
      setSkills(roles[selectedRole]);
    } else {
      setSkills([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const role = form.role.value;
    const selectedSkills = form.skills.selectedOptions;
    const skills = Array.from(selectedSkills).map((option) => option.value);
    const acceptTerms = form.acceptTerms.checked;

    // Basic validation
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      skills.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      alert("You must accept the terms and conditions.");
      return;
    }

    // Output the form data (In real case, you would send it to your API)
    console.log({
      fullName,
      email,
      password,
      role,
      skills,
      acceptTerms,
    });

    // Create a password-based account
    createUser(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error Message", error);
      });
    alert("Successfully Registration ✔ ");
    form.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Lottie Animation on the Left */}
        <div className="flex-1 bg-gradient-to-br from-indigo-100 to-teal-100 flex justify-center items-center p-8">
          <Lottie
            animationData={animationData}
            loop={true}
            className="max-w-full max-h-full transform transition-transform duration-300 hover:scale-105"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "450px",
              maxHeight: "450px",
            }}
          />
        </div>

        {/* Registration Form on the Right */}
        <div className="w-full max-w-md bg-white p-10 space-y-6 relative">
          <div className="absolute top-4 right-4 text-sm text-gray-500">
            Step 1/2
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-2 text-center">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Join our platform and unlock your professional potential
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Fields with Enhanced Styling */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  transition duration-300 ease-in-out 
                  hover:border-indigo-300"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  transition duration-300 ease-in-out 
                  hover:border-indigo-300"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  transition duration-300 ease-in-out 
                  hover:border-indigo-300"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  transition duration-300 ease-in-out 
                  hover:border-indigo-300"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                onChange={handleRoleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  transition duration-300 ease-in-out 
                  hover:border-indigo-300"
              >
                <option value="">Select Role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Skills
              </label>
              <select
                id="skills"
                name="skills"
                multiple
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  transition duration-300 ease-in-out 
                  hover:border-indigo-300"
              >
                {skills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded 
                  focus:ring-indigo-500"
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 text-sm text-gray-700"
              >
                I agree to the{" "}
                <span className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                  Terms and Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-teal-500 
                text-white font-bold rounded-lg shadow-lg 
                hover:from-indigo-700 hover:to-teal-600 
                transition duration-300 ease-in-out 
                transform hover:scale-[1.02] active:scale-100"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
