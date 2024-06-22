const { Router } = require('express');

const { checkAuthorization } = require('../middlewares');
const { 
    getAllUsers, 
    getUser, 
    editUser, 
    getAllEducations, 
    addEducation,
    editEducation, 
    deleteEducation,
} = require('../services');

const router = Router();
// 유저 라우터
router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.put('/:userId', checkAuthorization, editUser);
// 학력 라우터
router.get('/:userId/educations', getAllEducations);
router.post('/:userId/educations', checkAuthorization, addEducation);
router.put('/:userId/educations/:educationId', checkAuthorization, editEducation);
router.delete('/:userId/educations/:educationId', checkAuthorization, deleteEducation);

module.exports = router;