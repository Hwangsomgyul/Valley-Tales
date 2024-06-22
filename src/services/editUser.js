const { userModel } = require('../db/models');

const editUser = async (req, res, next) => {
    const { userId } = req.params;
    // try catch 쓰는 방식으로 가봅시다.
    const { name, email, description } = req.body;
    const editedUser = await userModel.updateById(userId, { name, email, description});
    const data = {
        name: editedUser.name,
        email: editedUser.email,
        description: editedUser.description,
    };
    return res.json(data);
}

module.exports = editUser;