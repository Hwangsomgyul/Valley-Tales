const { Router } = require('express');

const { validateProject } = require('../middlewares');
const { getAllProjects, addProject, editProject, deleteProject } = require('../services');

const router = Router();

router.get('/:userId', getAllProjects);
router.post('/', validateProject, addProject);
router.put('/:projectId', validateProject, editProject);
router.delete('/:projectId', deleteProject);

module.exports = router;