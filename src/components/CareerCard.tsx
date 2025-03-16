
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp, Users, Award } from 'lucide-react';

interface CareerCardProps {
  title: string;
  match: number;
  salary: string;
  growth: string;
  description: string;
  skills: string[];
  index: number;
}

const CareerCard: React.FC<CareerCardProps> = ({
  title,
  match,
  salary,
  growth,
  description,
  skills,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100 card-hover"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="px-3 py-1 bg-career-blue-100 text-career-blue-700 rounded-full text-sm font-medium">
            {match}% Match
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
              {skill}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-700 text-sm mb-1">
              <Award size={14} className="mr-1" />
              <span>Avg. Salary</span>
            </div>
            <p className="font-semibold">{salary}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-700 text-sm mb-1">
              <TrendingUp size={14} className="mr-1" />
              <span>Growth</span>
            </div>
            <p className="font-semibold text-green-600">{growth}</p>
          </div>
        </div>
        
        <button className="w-full py-2 border border-career-blue-200 text-career-blue-600 rounded-lg flex items-center justify-center space-x-1 hover:bg-career-blue-50 transition-colors">
          <span>View Details</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CareerCard;
