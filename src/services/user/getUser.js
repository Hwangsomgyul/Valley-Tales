const { userModel } = require('../../db/models');

const { userNotFound } = require('../../utils');

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const foundUser = await userModel.findById(userId);
        userNotFound(foundUser);
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