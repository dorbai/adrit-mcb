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
 * A ready-to-use handler that relies on the `GEMINI_API_KEY` environment variable.
 * In browser builds, this usually comes from your bundler's environment variables.
 */
export const defaultAIHandler = createGoogleAIHandler(
  (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '') ||
    (typeof import.meta !== 'undefined' ? (import.meta as any).env?.GEMINI_API_KEY : '') ||
    ''
);
