const { Router } = require('express');

const { getAllEducations, addEducation, editEducation, deleteEducation } = require('../services');

const router = Router();

router.get('/:userId', getAllEducations);
router.post('/', addEducation);
router.put('/:educationId', editEducation);
router.delete('/:educationId', deleteEducation);

module.exports = router;