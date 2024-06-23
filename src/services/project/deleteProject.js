const { projectModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../utils');

const deleteProject = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const foundProject = await projectModel.findOne({ projectId }).populate('author');
        dataNotFound(foundProject);
        checkAuthorization(foundProject.author.userId, req.user.userId);
        // 없으면 삭제 안되게 ㄱㄱ
        if (!!foundProject.deletedAt) {
            const err = new Error('이미 삭제된 데이터');
            err.statusCode = 409;
            throw err;
        }
        const deletedProject = await projectModel.findOneAndUpdate({ projectId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedProject.deletedAt) {
            const err = new Error('삭제가 잘 안되네요...');
            throw err;
        }
        return res.status(204).json({data: "삭제 성공"});
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteProject;