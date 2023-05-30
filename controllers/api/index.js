const router = require('express').Router();
const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/api', userRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
