const {Thoughts, Users} = require('../models');

module.exports = {

    //get all thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .then((courses) => res.json(courses))
        .catch((err) => res.status(500).json(err));
    },

    //get one thought by id
    getThoughtsById(req,res){
        Thoughts.findOne({_id: params.thoughtId })
        .select("-__v")
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No course with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },

    //create a new thought
    createThoughts({ params, body },res){
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                console.log('No User found with this id! first error');
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err))
    },
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
};

