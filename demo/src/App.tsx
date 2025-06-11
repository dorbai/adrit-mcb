import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ChatbotWidget } from '../../src';

// Example custom AI handler using a mock API
const mockAiHandler = async (messages: { role: string; content: string }[]) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get the last user message
  const lastMessage = messages.find(m => m.role === 'user')?.content ?? '';
  
  // Simple response logic
  if (lastMessage.toLowerCase().includes('hello')) {
    return 'Hello! How can I assist you today?';
  } else if (lastMessage.toLowerCase().includes('help')) {
    return 'I\'m here to help! What do you need assistance with?';
  } else {
    return `I received your message: "${lastMessage}". How can I help you further?`;
  }
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const ConfigSection = styled.section`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ConfigTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 400px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
`;

const Demo: React.FC = () => {
  const [config, setConfig] = useState({
    buttonColor: '#0070f3',
    themeColor: '#0070f3',
    greeting: '👋 Hi there! How can I help you today?',
    systemInstructions: 'You are a helpful assistant',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Header>
        <Title>Floating Chatbot Widget Demo</Title>
        <Description>
          A customizable React component that provides an elegant chat interface with built-in AI capabilities.
        </Description>
      </Header>

      <ConfigSection>
        <ConfigTitle>Customize the Widget</ConfigTitle>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Label>
            Button Color
            <Input
              type="color"
              name="buttonColor"
              value={config.buttonColor}
              onChange={handleChange}
            />
          </Label>
          
          <Label>
            Theme Color
            <Input
              type="color"
              name="themeColor"
              value={config.themeColor}
              onChange={handleChange}
            />
          </Label>
          
          <Label>
            Greeting Message
            <Input
              type="text"
              name="greeting"
              value={config.greeting}
              onChange={handleChange}
            />
          </Label>
          
          <Label>
            System Instructions
            <TextArea
              name="systemInstructions"
              value={config.systemInstructions}
              onChange={handleChange}
            />
          </Label>
        </Form>
      </ConfigSection>      <ChatbotWidget
        buttonColor={config.buttonColor}
        themeColor={config.themeColor}
        greeting={config.greeting}
        systemInstructions={config.systemInstructions}
        aiHandler={mockAiHandler}
      />
    </Container>
  );
};

export default Demo;
