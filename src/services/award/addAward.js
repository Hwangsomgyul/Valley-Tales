const { userModel, awardModel } = require('../../db/models');

const addAward = async (req, res, next) => {
    try {
        const { title, organization, date } = req.body;
        const user = await userModel.findById(req.user.userId);
        const addedAward = await awardModel.addAward({
            author: user,
            title,
            organization,
            date,
        });
        return res.json({
            title: addedAward.title,
            organization: addedAward.organization,
            date: addedAward.date,
            createdAt: addedAward.createdAt,
            updatedAt: addedAward.updatedAt,
            awardId: addedAward.awardId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = addAward;