
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const QuizSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="bg-career-blue-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <span className="feature-chip mb-4">Try It Now</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Career Discovery Journey
            </h2>
            <p className="text-gray-600 mb-6">
              Answer a few quick questions to get a taste of our AI-powered career assessment. Ready to find your perfect career match?
            </p>

            <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Quick Sample Question</h3>
              <p className="text-gray-700 mb-4">What energizes you the most in a work environment?</p>
              
              <div className="space-y-3 mb-6">
                {[
                  "Solving complex technical problems",
                  "Collaborating with a team on creative projects",
                  "Leading others and making strategic decisions",
                  "Working independently on detailed tasks"
                ].map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === index 
                        ? 'border-career-blue-500 bg-career-blue-50' 
                        : 'border-gray-200 hover:border-career-blue-300'
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedOption === index 
                          ? 'border-career-blue-500 bg-career-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === index && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/assessment" 
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Continue Full Assessment</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-career-blue-200 rounded-2xl blur-xl opacity-30 transform -rotate-3"></div>
              <div className="relative glass-card rounded-2xl overflow-hidden shadow-card p-6">
                <h3 className="text-xl font-semibold mb-4">Based on your responses, you might excel in:</h3>
                
                {[
                  {
                    title: "UX/UI Designer",
                    match: "94%",
                    description: "Combines creativity with technical problem-solving to create intuitive digital experiences.",
                    skills: ["Design thinking", "User research", "Prototyping"]
                  },
                  {
                    title: "Product Manager",
                    match: "89%",
                    description: "Leads product development by understanding user needs and business goals.",
                    skills: ["Strategic thinking", "Communication", "Technical knowledge"]
                  },
                  {
                    title: "Data Scientist",
                    match: "78%",
                    description: "Analyzes data to provide insights and solve complex problems.",
                    skills: ["Statistical analysis", "Programming", "Critical thinking"]
                  }
                ].map((career, index) => (
                  <div 
                    key={index}
                    className={`border-b border-gray-100 py-4 ${index === 0 ? 'bg-career-blue-50/50 rounded-lg p-4 -m-2 mb-2' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{career.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        index === 0 ? 'bg-career-blue-500 text-white' : 'bg-career-blue-100 text-career-blue-700'
                      }`}>
                        {career.match} Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 text-center">
                  <Link 
                    to="/assessment" 
                    className="text-career-blue-600 font-medium hover:underline inline-flex items-center"
                  >
                    <span>See full career analysis</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
