const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
      try {
        const users = await User.find()
        //   .populate('deck');
  
        const userObj = {
          users,
          // userCount: await userCount(),
        };
  
        res.json(userObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user by ID
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
  
        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
};