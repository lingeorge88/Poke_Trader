import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        }
      }
    }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_CARD = gql`
  mutation SaveCard($cardId: String!, $name: String!, $image: String, $setName: String, $seriesName: String, $setImage: String, $rarity: String, $releaseDate: String) {
    saveCard(cardId: $cardId, name: $name, image: $image, setName: $setName, seriesName: $seriesName, setImage: $setImage, rarity: $rarity, releaseDate: $releaseDate) {
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

export const REMOVE_CARD = gql`
  mutation RemoveCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
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