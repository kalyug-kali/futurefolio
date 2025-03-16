// Gemini API utilities
import { toast } from "@/hooks/use-toast";

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key or use env variable

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface GeminiPromptParams {
  contents: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export async function generateGeminiResponse(prompt: string, options: {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
} = {}) {
  const { temperature = 0.7, maxTokens = 800, systemPrompt } = options;
  
  try {
    const promptParams: GeminiPromptParams = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: maxTokens
      }
    };
    
    if (systemPrompt) {
      promptParams.contents.unshift({
        role: "system",
        parts: [{ text: systemPrompt }]
      });
    }
    
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(promptParams)
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated");
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    toast.error("Failed to generate AI response. Please try again.");
    return null;
  }
}

// Career-specific prompt generators
export async function generateCareerMatches(skills: string[], interests: string[]) {
  const prompt = `
    Based on the following skills and interests, suggest 3 suitable career paths:
    
    Skills: ${skills.join(', ')}
    Interests: ${interests.join(', ')}
    
    For each career path, provide:
    1. Job title
    2. Match percentage (between 75-98%)
    3. Salary range
    4. Growth projection
    5. Brief description (max 30 words)
    6. 5 key skills required
    
    Format as JSON array like:
    [
      {
        "title": "Job Title",
        "match": 85,
        "salary": "$XX,XXX - $YY,YYY",
        "growth": "+Z% yearly",
        "description": "Brief description",
        "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
      }
    ]
  `;
  
  const response = await generateGeminiResponse(prompt, { 
    temperature: 0.7,
    systemPrompt: "You are a career advisor AI specializing in job market analysis." 
  });
  
  if (!response) return null;
  
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    toast.error("Failed to process AI recommendations. Please try again.");
    return null;
  }
}

export async function generateLearningPaths(career: string) {
  const prompt = `
    Suggest 3 learning paths for someone pursuing a career as a ${career}.
    
    For each learning path, provide:
    1. Title of the learning path/course
    2. Provider (e.g., Coursera, Udemy, edX)
    3. Duration (in weeks)
    4. Difficulty level (Beginner, Intermediate, Advanced)
    
    Format as JSON array like:
    [
      {
        "title": "Course Title",
        "provider": "Provider Name",
        "duration": "X weeks",
        "level": "Difficulty Level"
      }
    ]
  `;
  
  const response = await generateGeminiResponse(prompt, { 
    temperature: 0.7,
    systemPrompt: "You are an educational advisor AI specializing in career development courses." 
  });
  
  if (!response) return null;
  
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    toast.error("Failed to process AI learning paths. Please try again.");
    return null;
  }
}

export async function generateMentorResponse(question: string, careerContext?: string) {
  const contextPrompt = careerContext ? 
    `Consider that the user is interested in pursuing a career in ${careerContext}.` : '';
  
  const prompt = `
    ${contextPrompt}
    
    User question: ${question}
    
    Provide a helpful, informative and encouraging response as an AI career mentor.
    Keep the response concise (max 150 words) but insightful.
  `;
  
  return generateGeminiResponse(prompt, { 
    temperature: 0.8,
    systemPrompt: "You are an AI mentor who specializes in career guidance. Be supportive, encouraging, and give practical advice." 
  });
}
