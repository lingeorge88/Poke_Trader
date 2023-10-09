import { saveCardIds, removeCardId, getSavedCardIds } from "../utils/localStorage";

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  describe('localStorage utilities', ()=>{
    beforeEach(()=> {
        jest.clearAllMocks();
    });
    test('returns an empty array when there are no saved cards', () => {
        const result = getSavedCardIds();
        expect(result).toEqual([]);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('saved_cards');
      });

    test('getSavedCardIds should retrieve the saved CardIds', ()=>{
        const mockSavedCards=["xy2-13", "g1-12"];
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockSavedCards));
        const result = getSavedCardIds();
        expect(result).toEqual(mockSavedCards);
    });
    test('removes saved card ID if it exists', () => {
        const mockSavedCards = ["sm75-1", "sm115-7"];
        const cardToRemove = "sm75-1";
        const expectedCardsAfterRemoval = ["sm115-7"];
    
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockSavedCards));
        const result = removeCardId(cardToRemove);
        expect(result).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('saved_cards', JSON.stringify(expectedCardsAfterRemoval));
      });

      it('does not remove card ID if no cards are saved', () => {
        const cardToRemove = 'xyz-13';
    
        mockLocalStorage.getItem.mockReturnValueOnce(null);
    
        const result = removeCardId(cardToRemove);
    
        expect(result).toBe(false);
        expect(localStorage.setItem).not.toHaveBeenCalled();
      });
    
      it('removes saved_cards from localStorage if saving an empty array', () => {
        saveCardIds([]);
    
        expect(localStorage.removeItem).toHaveBeenCalledWith('saved_cards');
      });
  })