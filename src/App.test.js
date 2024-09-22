import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/React Socket\.io/i);
  expect(header).toBeInTheDocument();
});
