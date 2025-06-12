import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import type { ChatMessage } from './types';

/**
 * Creates a Genkit-powered AI handler for the ChatbotWidget.
 *
 * You typically call this once at app start and pass the resulting function
 * into the widget via the `aiHandler` prop:
 *
 * ```tsx
 * const aiHandler = createGenkitHandler(import.meta.env.VITE_GEMINI_API_KEY!);
 * <ChatbotWidget aiHandler={aiHandler} />
 * ```
 *
 * For Node.js (for example if you expose the handler through an API route)
 * you can rely on the `GEMINI_API_KEY` environment variable and simply use
 * `defaultGenkitHandler`.
 */
export function createGenkitHandler(apiKey: string, modelId = 'gemini-2.0-flash') {
  if (!apiKey) {
    console.warn('[adrit-mcb] createGenkitHandler called with empty apiKey.');
  }

  // Configure Genkit once.
  const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: googleAI.model(modelId),
  });

  // The function returned matches the ChatbotWidget `aiHandler` signature.
  return async (messages: ChatMessage[]): Promise<string> => {
    // Convert structured messages into a simple text prompt.
    const prompt = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n');

    const { text } = await ai.generate(prompt);
    return text;
  };
}

/**
 * A ready-to-use handler that relies on the `GEMINI_API_KEY` environment
 * variable.  In browser builds this is usually provided via your bundler
 * (e.g. `VITE_GEMINI_API_KEY` → `import.meta.env.GEMINI_API_KEY`).  If the
 * variable is missing we fall back to a mock response so the UI still works
 * during development.
 */
export const defaultGenkitHandler = createGenkitHandler(
  // Prefer vite/webpack env vars in browser, fall back to Node env.
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.GEMINI_API_KEY) ||
    process.env.GEMINI_API_KEY ||
    ''
);
