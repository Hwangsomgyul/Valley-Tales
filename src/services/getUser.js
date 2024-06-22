const { userModel } = require('../db/models');

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    // try catch 구현해야 함
    const foundUser = await userModel.findById(userId);
    const canEdit = foundUser.userId === req.user.userId;
    const data = {
        name: foundUser.name,
        email: foundUser.email,
        description: foundUser.description,
        canEdit,
    };
    return res.json(data);
}

module.exports = getUser;