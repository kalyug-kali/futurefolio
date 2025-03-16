
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AssessmentQuiz from '../components/AssessmentQuiz';
import PersonalizedLearningPath from '../components/PersonalizedLearningPath';
import { motion } from 'framer-motion';
import AnimatedTransition from '../components/AnimatedTransition';

const Assessment: React.FC = () => {
  const [showLearningPath, setShowLearningPath] = useState(false);
  
  useEffect(() => {
    // Check if learning path exists in sessionStorage
    const storedPath = sessionStorage.getItem('personalizedLearningPath');
    if (storedPath) {
      setShowLearningPath(true);
    }
  }, []);
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="feature-chip mb-4">Career Assessment</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Ideal Career Path</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Answer the following questions thoughtfully to help our AI understand your skills, interests, and work preferences. This will generate personalized career recommendations.
              </p>
            </motion.div>
            
            {!showLearningPath ? (
              <AssessmentQuiz />
            ) : (
              <PersonalizedLearningPath />
            )}
            
            {!showLearningPath && (
              <div className="mt-12 bg-career-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Why This Assessment Matters</h3>
                <p className="text-gray-700 mb-4">
                  Our AI-powered assessment analyzes multiple factors to provide accurate career recommendations:
                </p>
                <ul className="space-y-2">
                  {[
                    "Your natural skills and aptitudes",
                    "Work environment preferences",
                    "Value alignment with different industries",
                    "Problem-solving approach and thinking style",
                    "Social interaction preferences"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-5 h-5 rounded-full bg-career-blue-100 text-career-blue-600 flex items-center justify-center text-xs mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default Assessment;
