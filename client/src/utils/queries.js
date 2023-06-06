import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      savedCards {
        cardId
        name
        image
        setName
        seriesName
        setImage
        rarity
        releaseDate
      }
    }
  }
`;

export const QUERY_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      username
      email
      savedCards {
        cardId
        name
        image
        setName
        seriesName
        setImage
        rarity
        releaseDate
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      savedCards {
        cardId
        name
        image
        setName
        seriesName
        setImage
        rarity
        releaseDate
      }
    }
  }
`;