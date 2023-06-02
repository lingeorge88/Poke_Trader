const { User } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
  },
//   Mutation: {},
};

module.exports = resolvers;
