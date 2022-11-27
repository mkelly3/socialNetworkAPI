// Require express router
const router = require('express').Router();

// Set requirements (from thoughts-controller)
const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    addReaction,
    deleteReaction

} = require('../../controllers/thoughts-controller');

//gets all thoughts 
router.route('/').get(getAllThoughts);

//gets one thought by an id and one can update and delete the thought
router.route('/:id').get(getThoughtsById)

//post rought to create a thought based on a user id
router.route('/:userId').post(createThoughts);

//post route to add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

//for one thought one can delete a reaction based on the id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;