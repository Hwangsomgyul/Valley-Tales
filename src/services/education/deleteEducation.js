const { educationModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const deleteEducation = async (req, res, next) => {
    const { educationId } = req.params;
    try {
        const foundEducation = await educationModel.getEducation(educationId);
        checkAuthorization(foundEducation.author.userId, req.user.userId);
        const deletedMessage = await educationModel.deleteEducation(educationId);
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteEducation;