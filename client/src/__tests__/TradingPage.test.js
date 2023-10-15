import '@testing-library/jest-dom/extend-expect';
import { render, act, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import TradingPage from '../pages/TradingPage'; // adjust path accordingly
import { QUERY_USERS } from '../utils/queries';

const mocks = [{
    request: {
      query: QUERY_USERS,
    },
    result: {
      data: {
        users: [
          {
            _id: '1',
            username: 'Ash',
            email: 'ash@pokemon.com',
            savedCards: [
              {
                cardId: 'card1',
                name: 'Pikachu',
                image: 'pikachu_image_url',
                setName: 'Base Set',
                seriesName: 'Original',
                setImage: 'base_set_image_url',
                rarity: 'Common',
                releaseDate: '1999-01-01',
              }
            ]
          },
          {
            _id: '2',
            username: 'Brock',
            email: 'brock@pokemon.com',
            savedCards: [
              {
                cardId: 'card2',
                name: 'Geodude',
                image: 'geodude_image_url',
                setName: 'Base Set',
                seriesName: 'Original',
                setImage: 'base_set_image_url',
                rarity: 'Common',
                releaseDate: '1999-01-01',
              }
            ]
          }
        ],
      },
    },
  }];

describe('TradingPage component', () => {

  it('renders without error', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <TradingPage />
        </MemoryRouter>
      </MockedProvider>
    );
    
 
    expect(screen.getByText('Loading...')).toBeInTheDocument();

   
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Ash')).toBeInTheDocument();
    expect(screen.getByText('Brock')).toBeInTheDocument();
  });

});