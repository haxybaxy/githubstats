import { render, screen, fireEvent, act } from '@testing-library/react';
import { MainView } from '../MainView';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Setup mocks for browser APIs
beforeAll(() => {
  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

// Mock ComparisonView explicitly
jest.mock('../../ComparisonView/ComparisonView', () => ({
  ComparisonView: ({ onSearchStateChange }: { onSearchStateChange: (state: boolean) => void }) => (
    <div
      data-testid="comparison-view"
      onClick={() => onSearchStateChange(true)}
    >
      Comparison View
    </div>
  ),
}));

// Mock framer-motion to prevent animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('MainView', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const renderComponent = () => {
    return render(
      <ThemeProvider>
        <MainView />
      </ThemeProvider>
    );
  };

  it('renders all main components correctly', () => {
    renderComponent();

    expect(screen.getByTestId('main-view')).toBeInTheDocument();
    expect(screen.getByTestId('background-effects')).toBeInTheDocument();
    expect(screen.getByTestId('title-section')).toBeInTheDocument();

    expect(screen.getByTestId('title-section').querySelector('h1')).toHaveTextContent('GitHub Stats');
    expect(screen.getByText('View real-time GitHub profile contribution data.')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('updates UI elements when search becomes active', async () => {
    renderComponent();

    const titleSection = screen.getByTestId('title-section');
    const comparisonView = screen.getByTestId('comparison-view');

    // Initial state check
    expect(titleSection).toHaveAttribute('data-state', 'default');

    // Trigger search state change
    await act(async () => {
      fireEvent.click(comparisonView);
    });

    // Check if the title section has been transformed
    expect(titleSection).toHaveAttribute('data-state', 'transformed');
  });
});
