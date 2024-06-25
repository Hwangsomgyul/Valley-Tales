const { projectModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const editProject = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const foundProject = await projectModel.getProject(projectId);
        checkAuthorization(foundProject.author.userId, req.user.userId);
        const { title, description, startDate, endDate } = req.body;
        const updatedProject = await projectModel.updateProject(projectId, { title, description, startDate, endDate });
        return res.json({
            title: updatedProject.title,
            description: updatedProject.description,
            startDate: updatedProject.startDate,
            endDate: updatedProject.endDate,
            createdAt: updatedProject.createdAt,
            updatedAt: updatedProject.updatedAt,
            projectId: updatedProject.projectId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = editProject;