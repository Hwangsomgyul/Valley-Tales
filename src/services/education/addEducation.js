const { userModel, educationModel } = require('../../db/models');

const addEducation = async (req, res, next) => {
    const { school, degree, major, startDate, endDate } = req.body;
    const user = await userModel.findById(req.user.userId);
    const addedEducation = await educationModel.addEducation({ 
        author: user,
        school,
        degree,
        major,
        startDate,
        endDate,
    });
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