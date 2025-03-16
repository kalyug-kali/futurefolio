
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How do you prefer to solve problems?",
    options: [
      "Analyzing data and finding patterns",
      "Collaborating with others to brainstorm solutions",
      "Using creativity and thinking outside the box",
      "Following established procedures and best practices"
    ]
  },
  {
    id: 2,
    text: "In a team setting, which role do you naturally gravitate towards?",
    options: [
      "The leader who coordinates and delegates tasks",
      "The creative who generates new ideas",
      "The analyst who evaluates options logically",
      "The implementer who gets things done efficiently"
    ]
  },
  {
    id: 3,
    text: "What type of work environment energizes you the most?",
    options: [
      "Fast-paced with changing priorities",
      "Collaborative with lots of team interaction",
      "Structured with clear expectations",
      "Independent with freedom to make decisions"
    ]
  },
  {
    id: 4,
    text: "When learning something new, you prefer to:",
    options: [
      "Read detailed documentation and follow step-by-step guides",
      "Jump in and learn through hands-on experience",
      "Watch demonstrations and then try it yourself",
      "Discuss concepts with others to understand different perspectives"
    ]
  },
  {
    id: 5,
    text: "Which of these values is most important to you in your career?",
    options: [
      "Financial security and stability",
      "Making a positive impact on society",
      "Continuous learning and personal growth",
      "Recognition and advancement opportunities"
    ]
  }
];

const AssessmentQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      setIsCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex
    });
  };
  
  const isOptionSelected = (optionIndex: number) => {
    return answers[currentQuestion.id] === optionIndex;
  };
  
  const isCurrentQuestionAnswered = () => {
    return answers[currentQuestion.id] !== undefined;
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-card p-6"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-career-blue-600">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-career-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    isOptionSelected(index) 
                      ? 'border-career-blue-500 bg-career-blue-50' 
                      : 'border-gray-200 hover:border-career-blue-300'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      isOptionSelected(index) 
                        ? 'border-career-blue-500 bg-career-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {isOptionSelected(index) && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered()}
                className={`flex items-center px-6 py-2 rounded-lg ${
                  isCurrentQuestionAnswered()
                    ? 'bg-career-blue-500 text-white hover:bg-career-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight size={20} className="ml-1" />
                  </>
                ) : (
                  'Complete'
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-card p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Assessment Completed!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for completing the assessment. We're analyzing your answers to provide personalized career recommendations.
            </p>
            
            <Link 
              to="/dashboard" 
              className="btn-primary inline-block"
            >
              View Your Results
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssessmentQuiz;
