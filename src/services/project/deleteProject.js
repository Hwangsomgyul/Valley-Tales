const { projectModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../../utils');
const { ConflictError } = require('../../utils/customError');

const deleteProject = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const foundProject = await projectModel.findOne({ projectId }).populate('author');
        dataNotFound(foundProject);
        checkAuthorization(foundProject.author.userId, req.user.userId);
        // 없으면 삭제 안되게 ㄱㄱ
        if (!!foundProject.deletedAt) {
            throw new ConflictError('이미 삭제된 데이터입니다.');
        }
        const deletedProject = await projectModel.findOneAndUpdate({ projectId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedProject.deletedAt) {
            throw new Error('삭제에 실패했습니다.');
        }
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteProject;