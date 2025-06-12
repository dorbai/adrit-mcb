import React, { useState, useCallback, useRef, useEffect } from 'react';
import { defaultGenkitHandler } from './genkitHandler';
import type { ChatbotWidgetProps, Message, ChatState, ChatMessage, MessageRole } from './types';
import {
  FloatingButton,
  ChatContainer,
  ChatHeader,
  ChatFooter,
  MessagesContainer,
  MessageBubble,
  InputContainer,
  Input,
  SendButton,
} from './styles';

const DEFAULT_BUTTON_COLOR = '#0070f3';
const DEFAULT_THEME_COLOR = '#0070f3';
const DEFAULT_GREETING = '👋 Hi there! How can I help you today?';
const DEFAULT_SYSTEM_INSTRUCTIONS = 'You are a helpful assistant';
const DEFAULT_AI_HANDLER = defaultGenkitHandler;

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  buttonColor = DEFAULT_BUTTON_COLOR,
  themeColor = DEFAULT_THEME_COLOR,
  greeting = DEFAULT_GREETING,
  systemInstructions = DEFAULT_SYSTEM_INSTRUCTIONS,
  aiHandler = DEFAULT_AI_HANDLER,
}) => {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    messages: [],
    loading: false,
  });
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (state.isOpen && state.messages.length === 0) {
      setState(prev => ({
        ...prev,
        messages: [{
          id: '0',
          text: greeting,
          sender: 'ai',
          timestamp: new Date()
        }]
      }));
    }
  }, [state.isOpen, greeting]);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, scrollToBottom]);

  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || state.loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      loading: true
    }));
    setInputValue('');    try {
      const messages: ChatMessage[] = [
        { role: 'system', content: systemInstructions },
        ...state.messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: userMessage.text }
      ] as ChatMessage[];

      const response = await aiHandler(messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        loading: false
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [inputValue, state.loading, state.messages, systemInstructions]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <>
      <FloatingButton
        $buttonColor={buttonColor}
        onClick={toggleChat}
        aria-label={state.isOpen ? 'Close chat' : 'Open chat'}
      >
        {state.isOpen ? '✕' : '💬'}
      </FloatingButton>
      
      <ChatContainer $isOpen={state.isOpen} $themeColor={themeColor}>
        <ChatHeader $themeColor={themeColor}>
          AI Chat
        </ChatHeader>
        
        <MessagesContainer>
          {state.messages.map((message) => (
            <MessageBubble
              key={message.id}
              $isUser={message.sender === 'user'}
              $themeColor={themeColor}
            >
              {message.text}
            </MessageBubble>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        
        <InputContainer>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={state.loading}
          />
          <SendButton
            onClick={sendMessage}
            disabled={!inputValue.trim() || state.loading}
            $themeColor={themeColor}
          >
            {state.loading ? '...' : 'Send'}
          </SendButton>
        </InputContainer>
        <ChatFooter>
          Powered by <a href='https://dorbai.com'>DORB AI</a>
        </ChatFooter>
      </ChatContainer>
    </>
  );
};
