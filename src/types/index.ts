type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface ChatbotWidgetProps {
  buttonColor?: string;
  themeColor?: string;
  greeting?: string;
  systemInstructions?: string;
  aiHandler?: (messages: ChatMessage[]) => Promise<string>;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  loading: boolean;
}
