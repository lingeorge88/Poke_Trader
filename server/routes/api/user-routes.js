const router = require('express').Router();
const { 
    getAllUsers,
    createUser,
    deleteUser,
} = require('../../controllers/user-controller');

// TODO: add other routes
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').delete(deleteUser);

module.exports = router;