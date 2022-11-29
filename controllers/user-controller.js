// Require Users Model
const {Users} = require('../models');

module.exports = {
    //get all users

    getAllUsers(req,res){
        Users.find()
        .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
    },
    //find user by id
    getUsersById(req,res){
        Users.findOne({ _id: req.params.id })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //create a new user 
    createUsers(req,res){
        Users.create(req.body)
        .then((users)=>res.json(users))
        .catch((err) => {
            console.log(err); 
        });
    },
    //update one user by id
    updateUsers(req,res){
        Users.findOneAndUpdate(
            { _id: req.params.id},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
    //delete user by id
    deleteUsers({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json("User has been deleted");
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current Friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

};
