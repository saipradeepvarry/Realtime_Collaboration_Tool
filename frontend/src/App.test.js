import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders landing page heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Assuming LandingPage has a welcome message or heading
  const headingElement = screen.getByText(/welcome/i); // Adjust text as needed
  expect(headingElement).toBeInTheDocument();
});
