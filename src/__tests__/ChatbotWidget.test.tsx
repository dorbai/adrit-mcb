import React from 'react';
import { render, screen, fireEvent, waitFor } from './test-utils';
import userEvent from '@testing-library/user-event';
import { ChatbotWidget } from '../ChatbotWidget';
import { getClient } from 'genkit';

describe('ChatbotWidget', () => {
  it('renders the chat button initially', () => {
    render(<ChatbotWidget />);
    expect(screen.getByLabelText('Open chat')).toBeInTheDocument();
  });

  it('shows chat interface when button is clicked', () => {
    render(<ChatbotWidget />);
    
    const button = screen.getByLabelText('Open chat');
    fireEvent.click(button);
    
    expect(screen.getByText('Chat Support')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('displays default greeting message when opened', () => {
    render(<ChatbotWidget />);
    
    const button = screen.getByLabelText('Open chat');
    fireEvent.click(button);
    
    expect(screen.getByText('👋 Hi there! How can I help you today?')).toBeInTheDocument();
  });

  it('allows customization through props', () => {
    const customGreeting = 'Welcome to our support!';
    render(
      <ChatbotWidget
        buttonColor="#ff0000"
        themeColor="#00ff00"
        greeting={customGreeting}
      />
    );
    
    const button = screen.getByLabelText('Open chat');
    fireEvent.click(button);
    
    expect(screen.getByText(customGreeting)).toBeInTheDocument();
  });

  it('handles user input and AI responses', async () => {
    const user = userEvent.setup();
    render(<ChatbotWidget />);
    
    // Open chat
    const button = screen.getByLabelText('Open chat');
    await user.click(button);
    
    // Type and send message
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    await user.type(input, 'Hello, AI!');
    await user.click(sendButton);
    
    // Check if user message appears
    expect(screen.getByText('Hello, AI!')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText('Test AI response')).toBeInTheDocument();
    });
  });

  it('handles error cases gracefully', async () => {
    // Mock the genkit client to throw an error
    jest.mocked(getClient).mockImplementationOnce(() => ({
      generate: jest.fn().mockRejectedValue(new Error('API Error'))
    }));

    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<ChatbotWidget />);
    
    // Open chat
    await user.click(screen.getByLabelText('Open chat'));
    
    // Type and send message
    const input = screen.getByPlaceholderText('Type your message...');
    await user.type(input, 'Hello');
    await user.click(screen.getByText('Send'));
    
    // Verify error handling
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error generating response:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });
});
