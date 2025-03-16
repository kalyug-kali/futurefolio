
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast-variants";
import { motion, AnimatePresence } from 'framer-motion';
import { generateMentorResponse } from '@/lib/gemini';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isError?: boolean;
}

const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI Career Mentor. How can I help with your career journey today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const messageText = inputValue.trim();
    setLastUserMessage(messageText);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Generate AI response
      const response = await generateMentorResponse(messageText);
      
      if (response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle error case
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm sorry, I couldn't generate a response. Please try again or ask a different question.",
          role: 'assistant',
          timestamp: new Date(),
          isError: true
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error in mentor chat:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, there was an error processing your request. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!lastUserMessage || isLoading) return;
    
    setIsLoading(true);
    
    // Remove the last error message
    setMessages(prev => prev.filter(msg => !msg.isError));
    
    try {
      // Retry generating AI response
      const response = await generateMentorResponse(lastUserMessage);
      
      if (response) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle error case
        const errorMessage: Message = {
          id: Date.now().toString(),
          content: "I'm still having trouble generating a response. Please try asking a different question.",
          role: 'assistant',
          timestamp: new Date(),
          isError: true
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error in mentor chat retry:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, there was an error processing your request. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="border border-gray-100 shadow-card">
      <CardHeader className="bg-career-blue-500 text-white pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <CardTitle className="text-lg">AI Career Mentor</CardTitle>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="w-full justify-start px-4 pt-2 bg-white border-b">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="suggestions">Topic Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex flex-col h-[350px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      message.role === 'user' ? 'bg-career-blue-100 ml-2' : 'bg-gray-100'
                    }`}>
                      {message.role === 'user' ? (
                        <User size={16} className="text-career-blue-600" />
                      ) : (
                        <Bot size={16} className="text-gray-600" />
                      )}
                    </div>
                    
                    <div className={`py-2 px-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-career-blue-500 text-white rounded-tr-none' 
                        : message.isError
                          ? 'bg-red-50 text-red-800 border border-red-100 rounded-tl-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className={`text-xs ${
                          message.role === 'user' ? 'text-blue-100' : message.isError ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                        
                        {message.isError && (
                          <button 
                            onClick={handleRetry}
                            className="text-xs flex items-center text-red-600 hover:text-red-700 ml-2"
                            disabled={isLoading}
                          >
                            <RefreshCw size={12} className="mr-1" />
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start max-w-[85%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gray-100">
                      <Bot size={16} className="text-gray-600" />
                    </div>
                    
                    <div className="py-3 px-4 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
          
          <CardContent className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your career question..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !inputValue.trim()}
                className="bg-career-blue-500 hover:bg-career-blue-600"
              >
                <Send size={18} />
              </Button>
            </form>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="suggestions" className="p-4 h-[350px] overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Try asking about:</h3>
          <div className="space-y-2">
            {[
              "How do I prepare for a career in UX/UI design?",
              "What skills should I develop for a product management role?",
              "How to transition into data science from my current field?",
              "Tips for building a professional portfolio",
              "How to network effectively in the tech industry",
              "What certifications would boost my career prospects?",
              "How to negotiate salary for my first job?",
              "What's the best way to find a mentor in my field?"
            ].map((suggestion, idx) => (
              <div 
                key={idx}
                className="p-2 bg-gray-50 rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setInputValue(suggestion);
                  inputRef.current?.focus();
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIMentor;
