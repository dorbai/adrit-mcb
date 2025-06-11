import '@testing-library/jest-dom';

// Mock the genkit library
jest.mock('genkit', () => ({
  getClient: () => ({
    generate: jest.fn().mockResolvedValue({
      message: {
        content: 'Test AI response'
      }
    })
  })
}));
