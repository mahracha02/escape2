import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Labyrinthe } from '../Labyrinthe';

describe('Labyrinthe', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component correctly', () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    expect(screen.getByText('L\'Ordre des Couleurs')).toBeInTheDocument();
    expect(screen.getByText('Voir l\'indice')).toBeInTheDocument();
  });

  it('shows error message for incorrect sequence', async () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    
    fireEvent.click(screen.getByText('vert'));
    fireEvent.click(screen.getByText('bleu'));
    fireEvent.click(screen.getByText('rouge'));
    fireEvent.click(screen.getByText('orange'));
    fireEvent.click(screen.getByText('jaune'));
    fireEvent.click(screen.getByText('indigo'));
    fireEvent.click(screen.getByText('violet'));

    // Avancer le temps pour simuler le délai
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Séquence incorrecte. Essayez encore.'))).toBeInTheDocument();
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess for correct sequence', async () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    fireEvent.click(screen.getByText('rouge'));
    fireEvent.click(screen.getByText('orange'));
    fireEvent.click(screen.getByText('jaune'));
    fireEvent.click(screen.getByText('vert'));
    fireEvent.click(screen.getByText('bleu'));
    fireEvent.click(screen.getByText('indigo'));
    fireEvent.click(screen.getByText('violet'));

    // Avancer le temps pour simuler le délai
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Succès !'))).toBeInTheDocument();
    });

    // Avancer le temps pour simuler le délai final
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('displays current sequence', () => {
    render(<Labyrinthe onSuccess={mockOnSuccess} />);
    fireEvent.click(screen.getByText('rouge'));
    fireEvent.click(screen.getByText('bleu'));
    expect(screen.getByText(/Séquence actuelle :/)).toBeInTheDocument();
    expect(screen.getByText(/rouge → bleu/)).toBeInTheDocument();
  });
}); 