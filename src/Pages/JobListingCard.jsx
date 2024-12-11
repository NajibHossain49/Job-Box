import React from 'react';
import { MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';

const JobListingCard = ({ jobListing }) => {
  const {
    title,
    company,
    location,
    jobType,
    salaryRange,
    applicationDeadline,
    description,
    requirements,
    responsibilities,
    company_logo
  } = jobListing;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with Company Logo and Job Title */}
      <div className="flex items-center p-4 bg-gray-100">
        <img 
          src={company_logo} 
          alt={`${company} logo`} 
          className="w-16 h-16 object-contain mr-4 rounded"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{company}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-4">
        {/* Job Metadata */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <MapPin className="mr-2 text-gray-500" size={20} />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2 text-gray-500" size={20} />
            <span className="text-sm">{jobType}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 text-gray-500" size={20} />
            <span className="text-sm">
              {salaryRange.min} - {salaryRange.max} {salaryRange.currency.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-500" size={20} />
            <span className="text-sm">
              Apply by: {new Date(applicationDeadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Requirements */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Requirements</h3>
          <div className="flex flex-wrap gap-2">
            {requirements.map((req, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {req}
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700">
            {responsibilities.map((resp, index) => (
              <li key={index} className="text-sm">{resp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Application Button */}
      <div className="p-4 bg-gray-50">
        <a 
          href={`mailto:${jobListing.hr_email}?subject=Application for ${title} at ${company}`}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobListingCard;