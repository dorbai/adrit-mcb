import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage } from './types';

/**
 * Creates a Google AI handler for the ChatbotWidget.
 * 
 * @example
 * const aiHandler = createGoogleAIHandler('your-api-key');
 * <ChatbotWidget aiHandler={aiHandler} />
 */
export function createGoogleAIHandler(apiKey: string, modelId = 'gemini-1.5-flash') {
  if (!apiKey) {
    console.warn('[adrit-mcb] createGoogleAIHandler called with empty apiKey.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelId });

  return async (messages: ChatMessage[]): Promise<string> => {
    try {
      // Convert messages to the format expected by the Google AI SDK
      const chat = model.startChat({
        history: messages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.content);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Google AI:', error);
      return 'Sorry, I encountered an error processing your request.';
    }
  };
}

/**
 * Gets the API key from environment variables, supporting multiple build tools:
 * - Vite: import.meta.env.VITE_GEMINI_API_KEY
 * - Create React App: process.env.REACT_APP_GEMINI_API_KEY
 * - Node.js: process.env.GEMINI_API_KEY
 * - Direct variable: GEMINI_API_KEY
 */
function getApiKey(): string {
  // Check for Vite environment variables
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (
      (import.meta as any).env.VITE_GEMINI_API_KEY ||
      (import.meta as any).env.GEMINI_API_KEY ||
      ''
    );
  }

  // Check for Create React App environment variables
  if (typeof process !== 'undefined' && process.env) {
    return (
      process.env.REACT_APP_GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      ''
    );
  }

  // Check for global variable (for direct browser usage)
  if (typeof window !== 'undefined' && (window as any).GEMINI_API_KEY) {
    return (window as any).GEMINI_API_KEY;
  }

  return '';
}

/**
 * A ready-to-use handler that automatically tries to get the API key from environment variables.
 * For Vite: Use VITE_GEMINI_API_KEY in your .env file
 * For Create React App: Use REACT_APP_GEMINI_API_KEY in your .env file
 * For Node.js: Use GEMINI_API_KEY in your environment
 */
export const defaultAIHandler = createGoogleAIHandler(getApiKey());
