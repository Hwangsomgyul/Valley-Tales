const { projectModel } = require('../../db/models');

const getAllProjects = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const allProjects = await projectModel.getAllProjectsById(userId);
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