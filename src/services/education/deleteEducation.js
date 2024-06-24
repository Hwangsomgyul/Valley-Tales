const { educationModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../../utils');
const { ConflictError } = require('../../utils/customError');

const deleteEducation = async (req, res, next) => {
    const { educationId } = req.params;
    try {
        const foundEducation = await educationModel.findOne({ educationId }).populate('author');
        // 없으면 삭제 안되게 ㄱㄱ
        dataNotFound(foundEducation);
        checkAuthorization(foundEducation.author.userId, req.user.userId);
        if (!!foundEducation.deletedAt) {
            throw new ConflictError('이미 삭제된 데이터입니다.');
        }
        const deletedEducation = await educationModel.findOneAndUpdate({ educationId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedEducation.deletedAt) {
            throw new Error('삭제에 실패했습니다.');
        }
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteEducation;