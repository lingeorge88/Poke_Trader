const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
  },
//   Mutation: {},
};

module.exports = resolvers;
