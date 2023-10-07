import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('<SearchBar />', () => {
    it('calls onSearch with the selected Pokemon name when "I Choose You!" is clicked', () => {
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch} />);

       
        const input = screen.getByLabelText('Search Pokemon');
        userEvent.type(input, 'Pikachu');

       
        const button = screen.getByRole('button', { name: /i choose you!/i });
        userEvent.click(button);

        
        expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
    });

    it('does not call onSearch when search bar is empty', () => {
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch} />);

       
        const button = screen.getByRole('button', { name: /i choose you!/i });
        userEvent.click(button);

        expect(mockOnSearch).not.toHaveBeenCalled();
    });
});