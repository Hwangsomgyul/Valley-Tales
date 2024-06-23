const { Router } = require('express');

const { 
    getAllUsers, 
    getUser, 
    editUser, 
} = require('../services');

const router = Router();
// 유저 라우터
router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.put('/', editUser);

module.exports = router;