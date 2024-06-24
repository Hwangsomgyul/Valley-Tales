const { Router } = require('express');

const { validateAward } = require('../middlewares');
const { getAllAwards, addAward, editAward, deleteAward } = require('../services');

const router = Router();

router.get('/:userId', getAllAwards);
router.post('/', validateAward, addAward);
router.put('/:awardId', validateAward, editAward);
router.delete('/:awardId', deleteAward);

module.exports = router;