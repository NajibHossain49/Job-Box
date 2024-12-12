import React, { useState, useEffect } from 'react';
import JobListingCard from './JobListingCard'; 

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all jobs 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/LatestJobs");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setJobs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Latest Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobListingCard 
            key={job._id} 
            jobListing={job} 
          />
        ))}
      </div>
      {jobs.length === 0 && (
        <p className="text-center text-gray-500">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default LatestJobs;