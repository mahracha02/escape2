import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MotDePasse } from '../MotDePasse';

describe('MotDePasse', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component correctly', () => {
    render(<MotDePasse onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Le Coffre-Fort Secret')).toBeInTheDocument();
    expect(screen.getByText('Voir l\'indice')).toBeInTheDocument();
  });

  it('shows error message for incorrect password', async () => {
    render(<MotDePasse onSuccess={mockOnSuccess} />);
    const input = screen.getByPlaceholderText('Entrez le mot de passe...');
    const submitButton = screen.getByText('Valider');
    fireEvent.change(input, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    // Avancer le temps pour simuler le délai
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Mot de passe incorrect. Essayez encore.'))).toBeInTheDocument();
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
}); 