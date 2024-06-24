const { Router } = require('express');

const { validateUser } = require('../middlewares');
const { 
    getAllUsers, 
    getUser, 
    editUser, 
} = require('../services');

const router = Router();
// 유저 라우터
router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.put('/', validateUser, editUser);

module.exports = router;