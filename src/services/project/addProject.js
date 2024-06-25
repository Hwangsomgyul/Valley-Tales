const { userModel, projectModel } = require('../../db/models');

const addProject = async (req, res, next) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const user = await userModel.findById(req.user.userId);
        const addedProject = await projectModel.addProject({
            author: user,
            title,
            description,
            startDate,
            endDate,
        });
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