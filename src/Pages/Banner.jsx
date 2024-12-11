import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';

const JobBoxBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const searchBarVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const filterButtonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-16 px-6 overflow-hidden"
    >
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200 via-indigo-500 to-purple-600"></div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-extrabold mb-6 tracking-tight"
        >
          Find Your <span className="text-yellow-300">Dream Job</span> Today
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl mb-10 max-w-2xl opacity-90"
        >
          Discover thousands of opportunities across industries. Your next career move starts here.
        </motion.p>
        
        {/* Search and Filter Section */}
        <motion.div 
          variants={searchBarVariants}
          className="w-full max-w-4xl bg-white rounded-full shadow-2xl overflow-hidden flex items-center"
        >
          <div className="flex items-center pl-6 text-gray-500">
            <Search className="mr-3" />
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="w-full py-4 text-lg text-gray-800 outline-none"
            />
          </div>
          
          <div className="flex items-center border-l border-gray-200 pl-6 pr-4 text-gray-500">
            <MapPin className="mr-3" />
            <input 
              type="text" 
              placeholder="City or remote" 
              className="py-4 text-lg text-gray-800 outline-none w-40"
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold transition-colors flex items-center"
          >
            <Briefcase className="mr-2" /> Search Jobs
          </motion.button>
        </motion.div>
        
        {/* Quick Filters */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex space-x-4 opacity-80 hover:opacity-100 transition-all"
        >
          {['Full-Time', 'Remote', 'Entry Level'].map((filter) => (
            <motion.button
              key={filter}
              variants={filterButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center bg-white/20 rounded-full px-4 py-2 hover:bg-white/30 transition-colors"
            >
              {filter === 'Full-Time' && <Filter className="mr-2 size-4" />}
              {filter === 'Remote' && <Briefcase className="mr-2 size-4" />}
              {filter}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobBoxBanner;