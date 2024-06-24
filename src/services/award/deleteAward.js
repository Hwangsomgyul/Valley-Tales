const { awardModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../../utils');

const { ConflictError } = require('../../utils/customError');

const deleteAward = async (req, res, next) => {
    const { awardId } = req.params;
    try {
        const foundAward = await awardModel.findOne({ awardId }).populate('author');
        // 없으면 삭제 안되게 ㄱㄱ
        dataNotFound(foundAward);
        checkAuthorization(foundAward.author.userId, req.user.userId);
        if (!!foundAward.deletedAt) {
            throw new ConflictError('이미 삭제된 데이터입니다.');
        }
        const deletedAward = await awardModel.findOneAndUpdate({ awardId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedAward.deletedAt) {
            throw new Error('삭제에 실패했습니다.');
        }
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteAward;