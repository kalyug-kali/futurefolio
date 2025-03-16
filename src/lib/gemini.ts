
// Gemini API utilities
import { toast } from "@/hooks/use-toast-variants";

const GEMINI_API_KEY = "AIzaSyCblGfrsQ44aYDBd63wp5OIexcfjmWv1W0"; // Gemini API key

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  error?: {
    message: string;
    code: number;
  };
  promptFeedback?: {
    blockReason?: string;
  };
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
    stopSequences?: string[];
  };
  safetySettings?: {
    category: string;
    threshold: string;
  }[];
}

// Enhanced error handling and retry logic
export async function generateGeminiResponse(prompt: string, options: {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  retryCount?: number;
  timeoutMs?: number;
} = {}) {
  const { 
    temperature = 0.7, 
    maxTokens = 800, 
    systemPrompt, 
    retryCount = 3,
    timeoutMs = 30000  // 30 seconds timeout
  } = options;
  
  let retries = 0;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  const makeRequest = async () => {
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
        },
        // Add safety settings to prevent over-filtering
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      };
      
      if (systemPrompt) {
        promptParams.contents.unshift({
          role: "system",
          parts: [{ text: systemPrompt }]
        });
      }
      
      console.log("Sending request to Gemini API...");
      
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(promptParams),
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error response:", errorData);
        
        // Handle rate limiting specifically
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        
        throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      }
      
      const data: GeminiResponse = await response.json();
      console.log("Gemini API response received:", data);
      
      // Check for content filtering blocks
      if (data.promptFeedback?.blockReason) {
        throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
      }
      
      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message}`);
      }
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response generated from Gemini API");
      }
      
      // Process and return the text response
      const responseText = data.candidates[0].content.parts[0].text;
      return responseText;
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error("Gemini API request timed out");
        throw new Error("Request timed out. Please try again.");
      }
      
      if (retries < retryCount) {
        retries++;
        const backoffTime = Math.min(1000 * Math.pow(2, retries), 10000); // Exponential backoff, max 10 seconds
        console.log(`Retrying Gemini API request (${retries}/${retryCount}) after ${backoffTime}ms...`);
        
        // Wait before retrying with exponential backoff
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        return makeRequest();
      }
      
      throw error;
    }
  };
  
  try {
    const result = await makeRequest();
    return result;
  } catch (error: any) {
    console.error("Error generating Gemini response:", error);
    toast.error(error.message || "Failed to generate AI response. Please try again later.");
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

export async function generatePersonalizedLearningPath(skills: string[], interests: string[], quizAnswers: Record<number, number>) {
  // Convert quiz answers to meaningful insights
  const answerMeanings = [
    "Problem-solving approach", 
    "Team role preference",
    "Work environment preference",
    "Learning style",
    "Career values"
  ];
  
  const insightsText = Object.entries(quizAnswers)
    .map(([questionId, answerIndex]) => {
      const questionNumber = parseInt(questionId) - 1;
      return `${answerMeanings[questionNumber]}: Option ${answerIndex + 1}`;
    })
    .join('\n');
  
  const prompt = `
    Based on the following information about a user, create a personalized learning path:
    
    Skills: ${skills.join(', ')}
    Interests: ${interests.join(', ')}
    
    Assessment Results:
    ${insightsText}
    
    Generate a personalized learning path with:
    1. A recommended career direction
    2. 3-5 specific courses or resources to learn required skills
    3. Estimated timeline (in months)
    4. Learning milestones
    
    Format as JSON like:
    {
      "careerDirection": "Recommended career path",
      "description": "Brief explanation of why this path fits their profile",
      "courses": [
        {
          "title": "Course Title",
          "provider": "Provider Name",
          "duration": "X weeks",
          "level": "Difficulty Level",
          "description": "What this course covers",
          "link": "example.com/course"
        }
      ],
      "timeline": "X months",
      "milestones": [
        "Milestone 1 description",
        "Milestone 2 description"
      ]
    }
  `;
  
  const response = await generateGeminiResponse(prompt, { 
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "You are an educational advisor AI specializing in personalized learning paths based on skills, interests, and assessment results." 
  });
  
  if (!response) return null;
  
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    toast.error("Failed to generate personalized learning path. Please try again.");
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
    Use a friendly, conversational tone.
    If you don't know the answer, just say so instead of making things up.
  `;
  
  return generateGeminiResponse(prompt, { 
    temperature: 0.8,
    systemPrompt: "You are an AI mentor who specializes in career guidance. Be supportive, encouraging, and give practical advice.", 
    retryCount: 3,
    timeoutMs: 15000
  });
}
