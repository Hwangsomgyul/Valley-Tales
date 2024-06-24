const { userModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const editUser = async (req, res, next) => {
    // try catch 쓰는 방식으로 가봅시다.
    const { userId, name, email, description } = req.body;
    try {
        checkAuthorization(userId, req.user.userId);
        const editedUser = await userModel.updateById(userId, { name, email, description});
        const data = {
            name: editedUser.name,
            email: editedUser.email,
            description: editedUser.description,
        };
        return res.json(data);
    } catch (err) {
        return next(err);
    }
}

module.exports = editUser;