const router = require('express').Router();
const usersRoutes = require('./user-route');
const thoughtsRoutes = require('./thought-route');

// Add `/users` to created routes 
router.use('/users', usersRoutes);

// Add `/thoughts` to created routes 
router.use('/thoughts', thoughtsRoutes);

// Export Module Router
module.exports = router;