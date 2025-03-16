
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-career-blue-500 flex items-center justify-center text-white font-bold">
                CN
              </div>
              <span className="text-xl font-display font-medium">CareerNavigator</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Empowering career decisions with AI-driven insights and personalized guidance.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-career-blue-100 hover:text-career-blue-600 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Assessment', 'Dashboard', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-600 hover:text-career-blue-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Career Blog', 'Industry Insights', 'Success Stories', 'Learning Resources', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-career-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-career-blue-500 mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Innovation Street<br />
                  Tech City, TC 10101
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-career-blue-500 mr-2" />
                <a href="mailto:contact@careernavigator.ai" className="text-gray-600 hover:text-career-blue-600">
                  contact@careernavigator.ai
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-career-blue-500 mr-2" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-career-blue-600">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} CareerNavigator. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-career-blue-600">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-career-blue-600">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-career-blue-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
