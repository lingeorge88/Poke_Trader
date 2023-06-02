const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }
`;

module.exports = typeDefs;