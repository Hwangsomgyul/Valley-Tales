const { userModel, projectModel } = require('../../db/models');
const { userNotFound } = require('../utils');

const getAllProjects = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const author = await userModel.findById(userId);
        userNotFound(author);
        const allProjects = await projectModel.find({ author });
        const data = allProjects.map(project => ({
            title: project.title,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            projectId: project.projectId,
        }));
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = getAllProjects;