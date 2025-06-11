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

## License

MIT
