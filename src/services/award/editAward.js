const { awardModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const editAward = async (req, res, next) => {
    const { awardId } = req.params;
    try {
        const foundAward = await awardModel.getAward(awardId);
        checkAuthorization(foundAward.author.userId, req.user.userId);
        const { title, organization, date } = req.body;
        const updatedAward = await awardModel.updateAward(awardId, { title, organization, date });
        return res.json({
            title: updatedAward.title,
            organization: updatedAward.organization,
            date: updatedAward.date,
            createdAt: updatedAward.createdAt,
            updatedAt: updatedAward.updatedAt,
            awardId: updatedAward.awardId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = editAward;