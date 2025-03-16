
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Book, Clock, ArrowRight, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Course {
  title: string;
  provider: string;
  duration: string;
  level: string;
  description: string;
  link?: string;
}

interface LearningPath {
  careerDirection: string;
  description: string;
  courses: Course[];
  timeline: string;
  milestones: string[];
}

const PersonalizedLearningPath: React.FC = () => {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  
  useEffect(() => {
    // Get learning path from sessionStorage
    const storedPath = sessionStorage.getItem('personalizedLearningPath');
    if (storedPath) {
      try {
        setLearningPath(JSON.parse(storedPath));
      } catch (error) {
        console.error("Error parsing learning path:", error);
      }
    }
  }, []);
  
  if (!learningPath) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Your Personalized Learning Path</h2>
        
        <Card className="border-career-blue-100 shadow-card overflow-hidden">
          <CardHeader className="bg-career-blue-50 border-b border-career-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-career-blue-500 flex items-center justify-center shrink-0">
                <PenLine size={24} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{learningPath.careerDirection}</CardTitle>
                <p className="text-gray-600 mt-1">{learningPath.description}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="courses">
              <TabsList className="mb-6">
                <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
                <TabsTrigger value="timeline">Learning Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="space-y-4">
                {learningPath.courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:border-career-blue-200 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{course.title}</h3>
                      <span className="text-xs bg-career-blue-100 text-career-blue-700 px-2 py-1 rounded-full">{course.level}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{course.provider}</p>
                    
                    {course.description && (
                      <p className="text-sm mt-2">{course.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs flex items-center text-gray-500">
                        <Clock size={14} className="mr-1" /> {course.duration}
                      </span>
                      
                      {course.link && (
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-career-blue-600 text-sm hover:underline flex items-center"
                        >
                          View Course <ArrowRight size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="timeline">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-career-blue-600" />
                  <span className="font-medium">Estimated completion time:</span>
                  <span>{learningPath.timeline}</span>
                </div>
                
                <h3 className="font-semibold mb-3">Key Milestones</h3>
                <div className="space-y-3">
                  {learningPath.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-career-blue-100 text-career-blue-600 flex items-center justify-center shrink-0 mt-0.5 mr-3">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="text-gray-700">{milestone}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <Button 
                asChild
                className="bg-career-blue-500 hover:bg-career-blue-600"
              >
                <Link to="/dashboard">
                  Continue to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PersonalizedLearningPath;
