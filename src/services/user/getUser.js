const { userModel } = require('../../db/models');

const { NotFoundError } = require('../../utils/customError');

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const foundUser = await userModel.findById(userId);
        if (!foundUser) {
            throw new NotFoundError('사용자가 존재하지 않습니다.');
        }
        const canEdit = foundUser.userId === req.user.userId;
        const data = {
            name: foundUser.name,
            email: foundUser.email,
            description: foundUser.description,
            canEdit,
        };
        return res.json(data);
    } catch(err) {
        return next(err);
    }
}

module.exports = getUser;