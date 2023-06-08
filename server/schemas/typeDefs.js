const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedCards: [Card]
  }
  type Card {
    cardId: ID!
    name: String!
    image: String
    setName: String
    seriesName: String
    setImage: String
    rarity: String
    releaseDate: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    currentUser: User
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCard(
      cardId: ID!
    name: String!
    image: String
    setName: String
    seriesName: String
    setImage: String
    rarity: String
    releaseDate: String
    ): User

    removeCard(
      cardId: ID!
    ): User

  }

  
  

`;

module.exports = typeDefs;