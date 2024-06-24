const { Router } = require('express');

const { validateEducation } = require('../middlewares');
const { getAllEducations, addEducation, editEducation, deleteEducation } = require('../services');

const router = Router();

router.get('/:userId', getAllEducations);
router.post('/', validateEducation, addEducation);
router.put('/:educationId', validateEducation, editEducation);
router.delete('/:educationId', deleteEducation);

module.exports = router;