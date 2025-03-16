
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkillsRadar from '../components/SkillsRadar';
import CareerCard from '../components/CareerCard';
import { motion } from 'framer-motion';
import { Book, Briefcase, Users, Award, TrendingUp, MapPin } from 'lucide-react';
import AnimatedTransition from '../components/AnimatedTransition';

const Dashboard: React.FC = () => {
  // Sample data for Skills Radar
  const skillsData = [
    { subject: 'Technical', score: 80, fullMark: 100 },
    { subject: 'Leadership', score: 65, fullMark: 100 },
    { subject: 'Analytical', score: 90, fullMark: 100 },
    { subject: 'Creativity', score: 85, fullMark: 100 },
    { subject: 'Communication', score: 70, fullMark: 100 },
    { subject: 'Adaptability', score: 75, fullMark: 100 },
  ];
  
  // Sample data for career recommendations
  const careerRecommendations = [
    {
      title: "UX/UI Designer",
      match: 94,
      salary: "$85,000 - $120,000",
      growth: "+15% yearly",
      description: "Design digital experiences that are intuitive, accessible, and visually appealing for users.",
      skills: ["User Research", "Wireframing", "Visual Design", "Prototyping", "Usability Testing"]
    },
    {
      title: "Product Manager",
      match: 89,
      salary: "$95,000 - $140,000",
      growth: "+12% yearly",
      description: "Lead the development of products by understanding user needs and business objectives.",
      skills: ["Strategic Planning", "Market Analysis", "Product Development", "Leadership", "Technical Knowledge"]
    },
    {
      title: "Data Scientist",
      match: 78,
      salary: "$90,000 - $135,000",
      growth: "+19% yearly",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      skills: ["Statistical Analysis", "Machine Learning", "Python", "Data Visualization", "Problem-solving"]
    }
  ];
  
  // Sample learning paths
  const learningPaths = [
    {
      title: "UX Design Fundamentals",
      provider: "Coursera",
      duration: "10 weeks",
      level: "Beginner",
      icon: Book
    },
    {
      title: "Product Management Essentials",
      provider: "Udemy",
      duration: "8 weeks",
      level: "Intermediate",
      icon: Briefcase
    },
    {
      title: "Introduction to Data Science",
      provider: "edX",
      duration: "12 weeks",
      level: "Beginner",
      icon: TrendingUp
    }
  ];

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100 sticky top-24">
                  <div className="bg-career-blue-500 p-6 text-white">
                    <h2 className="text-xl font-semibold">Your Profile</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-career-blue-100 flex items-center justify-center text-career-blue-500 text-2xl font-bold mb-3">
                        JP
                      </div>
                      <h3 className="text-lg font-semibold">John Peterson</h3>
                      <p className="text-gray-600 text-sm">Assessment completed</p>
                    </div>
                    
                    <ul className="space-y-4">
                      {[
                        { name: "Dashboard", icon: TrendingUp, active: true },
                        { name: "Career Matches", icon: Briefcase, active: false },
                        { name: "Learning Path", icon: Book, active: false },
                        { name: "Mentors", icon: Users, active: false },
                        { name: "Achievements", icon: Award, active: false }
                      ].map((item, index) => (
                        <li key={index}>
                          <a 
                            href="#" 
                            className={`flex items-center p-3 rounded-lg ${
                              item.active 
                                ? 'bg-career-blue-50 text-career-blue-600' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon size={18} className="mr-3" />
                            <span>{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-9">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold mb-6">Your Career Dashboard</h1>
                  
                  {/* Skills Analysis */}
                  <div className="bg-white rounded-xl shadow-card p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2">
                        <span className="feature-chip mb-2">Skills Analysis</span>
                        <h2 className="text-xl font-semibold mb-2">Your Strengths & Abilities</h2>
                        <p className="text-gray-600 mb-4">
                          Based on your assessment, we've identified your key strengths and skill areas. This analysis helps match you with careers that leverage your natural abilities.
                        </p>
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Technical Skills</span>
                            <span className="text-career-blue-500">80%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '80%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-career-blue-500 h-full rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Leadership</span>
                            <span className="text-career-blue-500">65%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '65%' }}
                              transition={{ duration: 1, delay: 0.6 }}
                              className="bg-career-blue-500 h-full rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Analytical Thinking</span>
                            <span className="text-career-blue-500">90%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '90%' }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="bg-career-blue-500 h-full rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <SkillsRadar data={skillsData} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Career Recommendations */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="feature-chip mb-2">AI Recommendations</span>
                        <h2 className="text-xl font-semibold">Your Top Career Matches</h2>
                      </div>
                      <button className="text-career-blue-600 font-medium hover:underline">View All</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {careerRecommendations.map((career, index) => (
                        <CareerCard
                          key={index}
                          title={career.title}
                          match={career.match}
                          salary={career.salary}
                          growth={career.growth}
                          description={career.description}
                          skills={career.skills}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Learning Paths */}
                  <div className="bg-white rounded-xl shadow-card p-6 mb-8 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="feature-chip mb-2">Skill Development</span>
                        <h2 className="text-xl font-semibold">Recommended Learning Paths</h2>
                      </div>
                      <button className="text-career-blue-600 font-medium hover:underline">Explore All Courses</button>
                    </div>
                    
                    <div className="space-y-4">
                      {learningPaths.map((path, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-career-blue-100 flex items-center justify-center text-career-blue-600 mr-4">
                            <path.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{path.title}</h3>
                            <p className="text-sm text-gray-600">{path.provider} • {path.duration}</p>
                          </div>
                          <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                            {path.level}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="feature-chip mb-2">Networking</span>
                        <h2 className="text-xl font-semibold">Upcoming Career Events</h2>
                      </div>
                      <button className="text-career-blue-600 font-medium hover:underline">View Calendar</button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          title: "UX Design Industry Panel",
                          date: "June 15, 2023",
                          time: "4:00 PM - 5:30 PM",
                          location: "Virtual"
                        },
                        {
                          title: "Product Management Networking Mixer",
                          date: "June 22, 2023",
                          time: "6:00 PM - 8:00 PM",
                          location: "San Francisco, CA"
                        },
                        {
                          title: "Data Science Career Workshop",
                          date: "July 5, 2023",
                          time: "1:00 PM - 3:00 PM",
                          location: "Virtual"
                        }
                      ].map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-lg bg-career-blue-100 flex flex-col items-center justify-center text-career-blue-600 mr-4">
                            <span className="text-xs font-medium">{event.date.split(',')[0].split(' ')[0]}</span>
                            <span className="text-lg font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.time}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <MapPin size={14} className="mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <button className="px-3 py-1 border border-career-blue-200 text-career-blue-600 rounded-lg text-sm hover:bg-career-blue-50">
                            RSVP
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;
