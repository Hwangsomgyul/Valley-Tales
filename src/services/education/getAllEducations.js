const { educationModel } = require('../../db/models');

const getAllEducations = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const allEducations = await educationModel.getAllEducationsById(userId);
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