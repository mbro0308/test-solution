const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/city/London/distance/50/users', userController.getUsersByCityAndDistance);

module.exports = router;
