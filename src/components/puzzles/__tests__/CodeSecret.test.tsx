import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CodeSecret } from '../CodeSecret';

describe('CodeSecret', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component correctly', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    expect(screen.getByText('Le Coffre-Fort Numérique')).toBeInTheDocument();
    expect(screen.getByText('Voir l\'indice')).toBeInTheDocument();
    expect(screen.getByText('Valider')).toBeInTheDocument();
  });

  it('shows error message for incorrect code', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Entrer un code incorrect
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    fireEvent.click(screen.getByText('Valider'));

    expect(screen.getByText('Code incorrect. Essayez encore.')).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess for correct code (1337)', async () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Entrer le code correct
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '7' }));
    fireEvent.click(screen.getByText('Valider'));

    // Avancer le temps pour simuler les délais
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Vérifier que le coffre s'ouvre
    await waitFor(() => {
      expect(screen.getByText('Succès !')).toBeInTheDocument();
    });

    // Avancer le temps pour simuler le délai final
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('increments attempts counter and shows failure after 3 attempts', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Premier essai incorrect
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    fireEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Tentatives : 1/3')).toBeInTheDocument();

    // Deuxième essai incorrect
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '6' }));
    fireEvent.click(screen.getByRole('button', { name: '7' }));
    fireEvent.click(screen.getByRole('button', { name: '8' }));
    fireEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Tentatives : 2/3')).toBeInTheDocument();

    // Troisième essai incorrect
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Tentatives : 3/3')).toBeInTheDocument();
    expect(screen.getByText('Échec !')).toBeInTheDocument();
  });

  it('shows and hides hint modal', async () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Ouvrir l'indice
    fireEvent.click(screen.getByText('Voir l\'indice'));
    await waitFor(() => {
      expect(screen.getByText(/Le code est une représentation numérique du mot "LEET"/)).toBeInTheDocument();
    });

    // Fermer l'indice
    fireEvent.click(screen.getByText('Fermer'));
    await waitFor(() => {
      expect(screen.queryByText(/Le code est une représentation numérique du mot "LEET"/)).not.toBeInTheDocument();
    });
  });

  it('handles keyboard input correctly', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Tester la saisie de chiffres
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    expect(screen.getByTestId('code-digit-1')).toBeInTheDocument();
    expect(screen.getByTestId('code-digit-2')).toBeInTheDocument();
    expect(screen.getByTestId('code-digit-3')).toBeInTheDocument();
    expect(screen.getByTestId('code-digit-4')).toBeInTheDocument();

    // Tester le bouton de suppression
    fireEvent.click(screen.getByText('←'));
    expect(screen.queryByTestId('code-digit-4')).not.toBeInTheDocument();

    // Tester le bouton de réinitialisation
    fireEvent.click(screen.getByText('C'));
    expect(screen.queryByTestId('code-digit-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('code-digit-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('code-digit-3')).not.toBeInTheDocument();
  });

  it('disables input after success or failure', () => {
    render(<CodeSecret onSuccess={mockOnSuccess} />);
    
    // Simuler un échec
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    fireEvent.click(screen.getByText('Valider'));
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '6' }));
    fireEvent.click(screen.getByRole('button', { name: '7' }));
    fireEvent.click(screen.getByRole('button', { name: '8' }));
    fireEvent.click(screen.getByText('Valider'));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByText('Valider'));

    // Vérifier que les boutons sont désactivés
    expect(screen.getByText('Valider')).toBeDisabled();
    expect(screen.getByRole('button', { name: '1' })).toBeDisabled();
    expect(screen.getByText('C')).toBeDisabled();
    expect(screen.getByText('←')).toBeDisabled();
  });
}); 