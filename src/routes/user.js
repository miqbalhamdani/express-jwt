const express = require('express');
const router = express.Router();

// import services
const controllers = require('../controllers/user');

// define the home page route
router.post('/', controllers.create);
router.post('/authenticate', controllers.authenticate);

module.exports = router;
