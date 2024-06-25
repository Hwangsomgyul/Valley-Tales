const { projectModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const deleteProject = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const foundProject = await projectModel.getProject(projectId);
        checkAuthorization(foundProject.author.userId, req.user.userId);
        const deletedMessage = await projectModel.deleteProject(projectId);
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteProject;