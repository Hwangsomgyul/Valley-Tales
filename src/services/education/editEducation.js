const { educationModel } = require('../../db/models');
const checkAuthorization = require('../checkAuthorization');

const editEducation = async (req, res, next) => {
    const { educationId } = req.params;
    try {
        const foundEducation = await educationModel.findOne({ educationId }).populate('author');
        if (!foundEducation) {
            const err = new Error('존재하지 않는 학력 정보입니다.');
            err.statusCode = 404;
            throw err;
        }
        checkAuthorization(foundEducation.author.userId, req.user.userId);
        const { school, degree, major, startDate, endDate } = req.body;
        const updatedEducation = await educationModel.findOneAndUpdate({ educationId }, { school, degree, major, startDate, endDate }, {new: true});
        return res.json({
            school: updatedEducation.school,
            degree: updatedEducation.degree,
            major: updatedEducation.major,
            startDate: updatedEducation.startDate,
            endDate: updatedEducation.endDate,
            createdAt: updatedEducation.createdAt,
            updatedAt: updatedEducation.updatedAt,
            educationId: updatedEducation.educationId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = editEducation;