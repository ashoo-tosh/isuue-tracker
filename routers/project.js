const express = require('express');
const router = express.Router();


const projectController = require('../controllers/projectController');

//routes for create the project
router.post('/create', projectController.create);

// routes for creating issue 
router.post('/:id', projectController.createIssue);

// route  to create project form 
router.get('/projectio', projectController.createProject)

// route for  particular project page 
router.get('/project-data/:id', projectController.project);

// route for issue form page 
router.get('/issue-form/:id', projectController.issueForm);

// route to show project issue/issues 
router.get('/show-issues/:id', projectController.showProjectIssues);

module.exports = router;
