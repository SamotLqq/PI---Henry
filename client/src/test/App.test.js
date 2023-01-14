import { render, screen } from '@testing-library/react';

import App from '../App';

// No pasa porque jest no es compatible con Routes ni con axios.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
