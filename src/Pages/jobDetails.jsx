import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); // Get the job _id from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplying, setIsApplying] = useState(false); // Track whether the user is applying
  const [applicationStatus, setApplicationStatus] = useState(null); // Track application status (success or error)

  useEffect(() => {
    fetch(`http://localhost:5000/job-details/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get values directly from e.target.elements
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const coverLetter = form.coverLetter.value;

    // Create the application object
    const applicationData = {
      name,
      email,
      coverLetter,
      jobId: id, // Include the job id to link this application to the specific job
    };

    // Send the application data to the server
    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then((data) => {
        setApplicationStatus("Application submitted successfully");
        setIsApplying(false); // Hide the form after successful submission
      })
      .catch((err) => {
        console.error("Error submitting application:", err);
        setApplicationStatus("Failed to submit application. Please try again.");
      });
  };

  // Loading state
  if (loading) {
    return <p>Loading job details...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }

  // Job not found state
  if (!job) {
    return <p>Job not found!</p>;
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold">{job.title}</h1>
      <p className="text-gray-600">Location: {job.location}</p>
      <p className="text-gray-500">Job Type: {job.jobType}</p>
      <p className="text-gray-500">Category: {job.category}</p>
      <p className="text-gray-500">
        Application Deadline: {job.applicationDeadline}
      </p>
      <p className="text-gray-500">
        Salary: ${job.salaryRange.min} - ${job.salaryRange.max}
      </p>

      {/* If the user is not applying, show the "Apply Now" button */}
      {!isApplying && (
        <div className="mt-4">
          <button
            onClick={() => setIsApplying(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Apply Now
          </button>
        </div>
      )}

      {/* If the user is applying, show the application form */}
      {isApplying && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name" // Add name attribute to reference in e.target.elements
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" // Add name attribute to reference in e.target.elements
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverLetter"
              className="block text-sm font-semibold text-gray-700"
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter" // Add name attribute to reference in e.target.elements
              required
              rows="5"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      )}

      {/* Display the application status message */}
      {applicationStatus && <p>{applicationStatus}</p>}
    </div>
  );
};

export default JobDetails;
