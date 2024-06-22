const { userModel } = require('../db/models');

const getAllUsers = async (req, res) => {
    const allUsers = await userModel.findAll();
    const data = allUsers.filter(user => !user.deletedAt).map(user => ({
        name: user.name,
        email: user.email,
        description: user.description,
        userId: user.userId,
    }));
    return res.json(data);
}

module.exports = getAllUsers;