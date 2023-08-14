const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

//route for rendering home
router.get('/', homeController.home);

//route for accesing project file
router.use('/project', require('./project'));

module.exports = router;