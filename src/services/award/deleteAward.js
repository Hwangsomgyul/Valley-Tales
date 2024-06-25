const { awardModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const deleteAward = async (req, res, next) => {
    const { awardId } = req.params;
    try {
        const foundAward = await awardModel.getAward(awardId);
        checkAuthorization(foundAward.author.userId, req.user.userId);
        const deletedMessage = await awardModel.deleteAward(awardId);
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteAward;