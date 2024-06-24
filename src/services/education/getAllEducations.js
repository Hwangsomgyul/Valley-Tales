const { userModel, educationModel } = require('../../db/models');
const { userNotFound } = require('../../utils');

const getAllEducations = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const author = await userModel.findById(userId);
        userNotFound(author);
        const allEducations = await educationModel.find({ author });
        const data = allEducations.map(education => ({
            school: education.school,
            degree: education.degree,
            major: education.major,
            startDate: education.startDate,
            endDate: education.endDate,
            createdAt: education.createdAt,
            updatedAt: education.updatedAt,
            educationId: education.educationId,
        }));
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = getAllEducations;