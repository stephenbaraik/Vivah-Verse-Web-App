// Test Setup and Utilities
import { vi, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Setup after each test
afterEach(() => {
  cleanup();
});

// Setup before all tests
beforeAll(() => {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  };

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true
  });

  // Mock window.location
  const locationMock = {
    href: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: ''
  };

  Object.defineProperty(global, 'window', {
    value: {
      ...global.window,
      location: locationMock
    },
    writable: true
  });

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));
});

// Helper to create mock user
export const createMockUser = (overrides = {}) => ({
  id: '123',
  email: 'test@example.com',
  name: 'Test User',
  ...overrides
});

// Helper to create mock event
export const createMockEvent = (overrides = {}) => ({
  preventDefault: vi.fn(),
  target: {
    value: '',
    files: []
  },
  ...overrides
});

// Helper to wait for async operations
export const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

