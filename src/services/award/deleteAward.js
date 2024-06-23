const { awardModel } = require('../../db/models');
const checkAuthorization = require('../checkAuthorization');

const deleteAward = async (req, res, next) => {
    const { awardId } = req.params;
    try {
        const foundAward = await awardModel.findOne({ awardId }).populate('author');
        checkAuthorization(foundAward.author.userId, req.user.userId);
        // 없으면 삭제 안되게 ㄱㄱ
        if (!foundAward) {
            const err = new Error('없는 데이터');
            err.statusCode = 404;
            throw err;
        }
        if (!!foundAward.deleteAt) {
            const err = new Error('이미 삭제된 데이터');
            err.statusCode = 409;
            throw err;
        }
        const deletedAward = await awardModel.findOneAndUpdate({ awardId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedAward.deletedAt) {
            const err = new Error('삭제가 잘 안되네요...');
            throw err;
        }
        return res.status(204).json({data: "삭제 성공"});
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteAward;