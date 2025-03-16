
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import QuizSection from '../components/QuizSection';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { BrainCircuit, Search, GraduationCap, Route } from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Based Career Assessment",
      description: "Discover your ideal career path through advanced AI analysis of your skills, interests, and personality traits."
    },
    {
      icon: Search,
      title: "Smart Career Matching",
      description: "Get matched with careers based on real-time job market data, industry trends, and future growth projections."
    },
    {
      icon: GraduationCap,
      title: "Personalized Learning Paths",
      description: "Follow customized learning roadmaps that help you acquire the skills needed for your target career."
    },
    {
      icon: Route,
      title: "Career Roadmap Generator",
      description: "Receive a detailed step-by-step plan to reach your career goals with milestone tracking and progress visualization."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="feature-chip mb-4"
              >
                Key Features
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                How AI Powers Your Career Journey
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Our platform leverages advanced artificial intelligence to provide personalized career guidance tailored to your unique profile and goals.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        <QuizSection />
        
        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="feature-chip mb-4"
              >
                Success Stories
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Hear From Our Users
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Discover how our AI-powered career guidance has helped professionals find their perfect career path.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ritika",
                  role: "UX Designer at Google",
                  image: "https://i.pravatar.cc/150?img=1",
                  quote: "The career assessment accurately identified my strengths in visual thinking and problem-solving. Following the personalized learning path helped me transition into UX design and land my dream job."
                },
                {
                  name: "Abhinav mehra",
                  role: "Data Scientist at Amazon",
                  image: "https://i.pravatar.cc/150?img=8",
                  quote: "I was unsure about which technical path to pursue. The AI matched me with data science and provided a roadmap that helped me acquire the right skills in the right order."
                },
                {
                  name: "Priyanshi",
                  role: "Product Manager at Microsoft",
                  image: "https://i.pravatar.cc/150?img=5",
                  quote: "After 5 years in marketing, I wanted a change. The platform suggested product management as a perfect fit for my skills, and connected me with mentors who guided my transition."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-card p-6 border border-gray-100 card-hover"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
