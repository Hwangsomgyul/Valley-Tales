const { userModel, projectModel } = require('../../db/models');

const addProject = async (req, res, next) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const user = await userModel.findById(req.user.userId);
        const addedProject = await projectModel.create({
            author: user,
            title,
            description,
            startDate,
            endDate,
        });
        if (!addedProject) {
            const err = new Error('추가가 왜 안 되는 거지');
            err.statusCode = 500;
            throw err;
        }
        return res.json({
            title: addedProject.title,
            description: addedProject.description,
            startDate: addedProject.startDate,
            endDate: addedProject.endDate,
            createdAt: addedProject.createdAt,
            updatedAt: addedProject.updatedAt,
            projectId: addedProject.projectId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = addProject;