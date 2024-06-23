const { educationModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../utils');

const deleteEducation = async (req, res, next) => {
    const { educationId } = req.params;
    try {
        const foundEducation = await educationModel.findOne({ educationId }).populate('author');
        // 없으면 삭제 안되게 ㄱㄱ
        dataNotFound(foundEducation);
        checkAuthorization(foundEducation.author.userId, req.user.userId);
        if (!!foundEducation.deletedAt) {
            const err = new Error('이미 삭제된 데이터');
            err.statusCode = 409;
            throw err;
        }
        const deletedEducation = await educationModel.findOneAndUpdate({ educationId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedEducation.deletedAt) {
            const err = new Error('삭제가 잘 안되네요...');
            throw err;
        }
        return res.status(204).json("삭제 성공");
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteEducation;