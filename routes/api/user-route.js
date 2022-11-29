// Require express router
const router = require('express').Router();

// Set requirements (from user-controller)
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

//get all users and then one can post based on the user 
router.route('/').get(getAllUsers).post(createUsers);

//get user by id and one can update and delete it
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);


//for each user based on id one can add and delete friends 
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router; 