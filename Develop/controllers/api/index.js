const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboard');

router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);

