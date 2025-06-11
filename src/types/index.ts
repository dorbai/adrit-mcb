export interface ChatbotWidgetProps {
  buttonColor?: string;
  themeColor?: string;
  greeting?: string;
  systemInstructions?: string;
  aiHandler?: (messages: { role: 'system' | 'user' | 'assistant', content: string }[]) => Promise<string>;
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
