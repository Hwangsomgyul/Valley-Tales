const { Router } = require('express');

const { getAllProjects, addProject, editProject, deleteProject } = require('../services');

const router = Router();

router.get('/:userId', getAllProjects);
router.post('/', addProject);
router.put('/:projectId', editProject);
router.delete('/:projectId', deleteProject);

module.exports = router;