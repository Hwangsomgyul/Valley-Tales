const { userModel, educationModel } = require('../db/models');

const addEducation = async (req, res, next) => {
    const { school, degree, major, startDate, endDate } = req.body;
    const user = await userModel.findById(req.user.userId);
    const addedEducation = await educationModel.create({
        author: user,
        school,
        degree,
        major,
        startDate,
        endDate,
    });
    if (!addedEducation) {
        const err = new Error('추가가 왜 안 되는 거지');
        err.statusCode = 500;
        next(err);
        return;
    }
    return res.json({
        school: addedEducation.school,
        degree: addedEducation.degree,
        major: addedEducation.major,
        startDate: addedEducation.startDate,
        endDate: addedEducation.endDate,
        createdAt: addedEducation.createdAt,
        updatedAt: addedEducation.updatedAt,
        educationId: addedEducation.educationId,
    });
}

module.exports = addEducation;