// 유저를 삭제합니다.
// deletedAt에 현재 시간을 적어서 값이 있으면 삭제된 사용자, 없으면 삭제되지 않은 사용자입니다.

const { userModel } = require('../../db/models');

const deleteUser = async (req, res, next) => {
    const { userId } = req.user;
    await userModel.deleteById(userId);
    next();
}

module.exports = deleteUser;