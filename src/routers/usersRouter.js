const { Router } = require('express');

const { validateUser, imageUploader } = require('../middlewares');
const { getAllUsers, getUser, editUser, updateImage } = require('../services');

const router = Router();
// 유저 네트워크 목록 조회
router.get('/', getAllUsers);
// 유저 개인 정보 조회
router.get('/:userId', getUser);
// 유저 개인 정보 수정
router.put('/', validateUser, editUser);
// 유저 프로필 이미지 수정
router.put('/image', imageUploader.single('image'), updateImage);

module.exports = router;