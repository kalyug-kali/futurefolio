
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Award, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    })
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 px-6 flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-career-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-career-blue-200 rounded-full blur-3xl opacity-30" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            custom={0}
            className="flex flex-col space-y-6"
          >
            <motion.div 
              variants={fadeInUpVariants} 
              custom={0.5}
              className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-soft border border-career-blue-100"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-career-blue-100 text-career-blue-600">
                <BrainCircuit size={14} />
              </span>
              <span className="text-sm font-medium text-gray-700">AI-Powered Career Guidance</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUpVariants}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Discover Your <span className="text-career-blue-500">Perfect Career</span> Path with AI
            </motion.h1>
            
            <motion.p 
              variants={fadeInUpVariants}
              custom={1.5}
              className="text-lg text-gray-600 max-w-xl"
            >
              Using advanced AI technology to match your unique skills, personality, and interests with the ideal career opportunities in today's evolving job market.
            </motion.p>
            
            <motion.div 
              variants={fadeInUpVariants}
              custom={2}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
            >
              <Link 
                to="/assessment" 
                className="btn-primary flex items-center justify-center sm:justify-start space-x-2"
              >
                <span>Start Free Assessment</span>
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/dashboard" 
                className="btn-secondary"
              >
                Explore Dashboard
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUpVariants}
              custom={2.5}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-4 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <BrainCircuit size={18} className="text-career-blue-500" />
                <span>AI-powered matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={18} className="text-career-blue-500" />
                <span>Expert mentorship</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award size={18} className="text-career-blue-500" />
                <span>Personalized roadmaps</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-career-blue-200 rounded-2xl blur-xl opacity-30 transform rotate-3"></div>
              <div className="relative glass-card rounded-2xl overflow-hidden shadow-card">
                <div className="px-6 py-8 flex flex-col space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="feature-chip">Skills Assessment</span>
                      <h3 className="mt-4 text-xl font-semibold">Discover Your Strengths</h3>
                      <p className="mt-1 text-gray-500 text-sm">Complete your assessment to reveal your unique talents</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-career-blue-500">
                      <Award size={24} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Technical Skills</span>
                        <span className="text-career-blue-500">76%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-career-blue-500 h-full rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Creative Thinking</span>
                        <span className="text-career-blue-500">92%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-career-blue-500 h-full rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Leadership</span>
                        <span className="text-career-blue-500">64%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-career-blue-500 h-full rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/assessment" 
                    className="btn-primary text-center text-sm"
                  >
                    Continue Assessment
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center"
        >
          {[
            { number: "98%", text: "Career match accuracy" },
            { number: "1,200+", text: "Career paths analyzed" },
            { number: "25K+", text: "Successful placements" },
            { number: "150+", text: "Industry partners" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 shadow-soft card-hover"
            >
              <h3 className="text-3xl font-bold text-career-blue-600">{stat.number}</h3>
              <p className="text-sm text-gray-600 mt-2">{stat.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-career-blue-100/20 via-career-blue-50/10 to-career-blue-100/20" style={{ 
        maskImage: 'url("data:image/svg+xml,%3Csvg width="1600" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M.5 200s25-160 400-40c0 0 349 78 600-40 251-118 400-100 400-100V200H.5z" fill="%23000"/%3E%3C/svg%3E")',
        maskSize: '100% 100%',
        WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width="1600" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M.5 200s25-160 400-40c0 0 349 78 600-40 251-118 400-100 400-100V200H.5z" fill="%23000"/%3E%3C/svg%3E")',
        WebkitMaskSize: '100% 100%'
      }} />
    </div>
  );
};

export default HeroSection;
