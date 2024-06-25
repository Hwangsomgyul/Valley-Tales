const { awardModel } = require('../../db/models');

const getAllAwards = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const allAwards = await awardModel.getAllAwardsById(userId);
        const data = allAwards.map(award => ({
            title: award.title,
            organization: award.organization,
            date: award.date,
            createdAt: award.createdAt,
            updatedAt: award.updatedAt,
            awardId: award.awardId,
        }));
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = getAllAwards;