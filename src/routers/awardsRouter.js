const { Router } = require('express');

const { getAllAwards, addAward, editAward, deleteAward } = require('../services');

const router = Router();

router.get('/:userId', getAllAwards);
router.post('/', addAward);
router.put('/:awardId', editAward);
router.delete('/:awardId', deleteAward);

module.exports = router;