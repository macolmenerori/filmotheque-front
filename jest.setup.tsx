import { setupServer } from 'msw/node';

import '@testing-library/jest-dom';

import { handlers } from './src/mocks/msw/handlers/handlers';

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const noop = () => {
  return;
};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

// Mock the useNavigate hook
const mockedUsedNavigate = jest.fn();

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate
}));

// Mock react-hook-form
// jest.mock('react-hook-form', () => ({
//   ...jest.requireActual('react-hook-form'),
//   useForm: jest.fn()
// }));

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  root: null,
  rootMargin: '',
  takeRecords: jest.fn(),
  thresholds: [],
  disconnect: jest.fn()
}));

window.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));
