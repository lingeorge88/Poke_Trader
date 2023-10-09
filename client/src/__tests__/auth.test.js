import authService from '../utils/auth';
import decode from 'jwt-decode';

jest.mock('jwt-decode');

// Mocking localStorage
const mockLocalStorage = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mocking window.location.assign
Object.defineProperty(window, 'location', {
  value: { assign: jest.fn() },
  writable: true,
});

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets profile from token', () => {
    const mockToken = 'mockToken';
    const mockProfile = { name: 'John Doe' };

    mockLocalStorage.getItem.mockReturnValueOnce(mockToken);
    decode.mockReturnValueOnce(mockProfile);

    const profile = authService.getProfile();

    expect(profile).toEqual(mockProfile);
    expect(decode).toHaveBeenCalledWith(mockToken);
  });

  it('logs in the user', () => {
    const mockToken = 'mockToken';
    authService.login(mockToken);

    expect(localStorage.setItem).toHaveBeenCalledWith('id_token', mockToken);
    expect(window.location.assign).toHaveBeenCalledWith('/home');
  });

  it('logs out the user', () => {
    authService.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
    expect(window.location.assign).toHaveBeenCalledWith('/');
  });
});