const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./Dashboard');

router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;    
