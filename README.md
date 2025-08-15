# Floating Chatbot Widget

A customizable, floating chatbot widget for React applications that provides an elegant chat interface with built-in AI capabilities using Genkit.

## Features

- 🎨 Fully customizable appearance
- 💬 Floating chat button
- ⚡ Smooth animations
- 🤖 Built-in AI integration
- 📱 Responsive design
- ⌨️ Keyboard accessible

## Installation

```bash
npm install adrit-mcb
```

## Usage

```jsx
import { ChatbotWidget } from 'adrit-mcb';

function App() {
  return (
    <ChatbotWidget
      buttonColor="#0070f3"
      themeColor="#0070f3"
      greeting="👋 Hi there! How can I help you today?"
      systemInstructions="You are a helpful assistant"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonColor` | string | '#0070f3' | The background color of the floating button |
| `themeColor` | string | '#0070f3' | The primary theme color for the chat interface |
| `greeting` | string | '👋 Hi there! How can I help you today?' | The initial welcome message |
| `systemInstructions` | string | 'You are a helpful assistant' | Instructions for the AI's personality |
| `aiHandler` | function | Mock response | A function that handles AI message generation. Takes an array of messages and returns a Promise that resolves to the AI's response |

## AI Integration

### Using Google's Gemini (recommended)

1. Create a Gemini API key in [Google AI Studio](https://makersuite.google.com/app/apikey).
2. Expose the key to your build/deployment environment as an environment variable named `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY` if you use Vite).
3. No further code is required; the widget automatically picks up the key and uses the `gemini-2.0-flash` model by default.

```bash
# Unix-like
export GEMINI_API_KEY="YOUR_KEY"

# Windows (PowerShell)
$Env:GEMINI_API_KEY="YOUR_KEY"
```

If you need a custom model or wish to keep the key separate, create a handler:

```tsx
import { createGoogleAIHandler } from 'adrit-mcb/dist/genkitHandler';

// Available models: 'gemini-2.0-flash', 'gemini-2.0-pro', 'gemini-1.5-pro', etc.
const aiHandler = createGoogleAIHandler('YOUR_KEY', 'gemini-2.0-pro');

<ChatbotWidget aiHandler={aiHandler} />
```

### Bring your own AI service

You can integrate any AI service by providing an `aiHandler` function. Here's an example:

```typescript
const myAiHandler = async (messages: { role: string; content: string }[]) => {
  // Integration with your AI service
  const response = await myAiService.generateResponse(messages);
  return response;
};

// Usage
<ChatbotWidget
  aiHandler={myAiHandler}
  // ... other props
/>
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```


## Integration with Next.js App Router and Dynamic Import

We integrate the adrit-mcb chatbot widget using a dynamic import and render it only on the client.

### Installation

```bash
npm i adrit-mcb
# optional for React 19 type alignment
npm i -D @types/react@^19 @types/react-dom@^19
```

### Make the page a Client Component

At the very top of the page where you render the widget (e.g., `src/app/page.tsx`):

```tsx
"use client";
```

### Dynamic import (in the same file)

```tsx
import dynamic from 'next/dynamic';

const ChatbotWidget = dynamic(
  () => import('adrit-mcb').then(m => m.ChatbotWidget as any),
  { ssr: false }
);

// later in JSX
<ChatbotWidget />
```


## License

MIT
