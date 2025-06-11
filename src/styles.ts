import styled, { css } from 'styled-components';

export const FloatingButton = styled.button<{ $buttonColor: string }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.$buttonColor};
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ChatContainer = styled.div<{ $isOpen: boolean; $themeColor: string }>`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 1000;
  
  ${props => !props.$isOpen && css`
    transform: scale(0.9);
    opacity: 0;
    pointer-events: none;
  `}
`;

export const ChatHeader = styled.div<{ $themeColor: string }>`
  background-color: ${props => props.$themeColor};
  padding: 16px;
  border-radius: 12px 12px 0 0;
  color: white;
  font-weight: 600;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessageBubble = styled.div<{ $isUser: boolean; $themeColor: string }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.$isUser ? props.$themeColor : '#f0f0f0'};
  color: ${props => props.$isUser ? 'white' : 'black'};
`;

export const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #0070f3;
  }
`;

export const SendButton = styled.button<{ $themeColor: string }>`
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$themeColor};
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
