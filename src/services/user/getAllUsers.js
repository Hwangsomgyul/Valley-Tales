const { userModel } = require('../../db/models');

const getAllUsers = async (req, res) => {
    const { page, limit } = req.query;
    // const allUsers = await userModel.findAll(page, limit);
    const { users, totalUsers } = await userModel.findAll();
    const data = users.map(user => ({
        name: user.name,
        email: user.email,
        description: user.description,
        userId: user.userId,
    }));
    return res.json(data);
}

module.exports = getAllUsers;