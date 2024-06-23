const { certificateModel } = require('../../db/models');
const checkAuthorization = require('../checkAuthorization');

const deletedCertificate = async (req, res, next) => {
    const { certificateId } = req.params;
    try {
        const foundCertificate = await certificateModel.findOne({ certificateId }).populate('author');
        checkAuthorization(foundCertificate.author.userId, req.user.userId);
        // 없으면 삭제 안되게 ㄱㄱ
        if (!foundCertificate) {
            const err = new Error('없는 데이터');
            err.statusCode = 404;
            throw err;
        }
        if (!!foundCertificate.deletedAt) {
            const err = new Error('이미 삭제된 데이터');
            err.statusCode = 409;
            throw err;
        }
        const deletedCertificate = await certificateModel.findOneAndUpdate({ certificateId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedCertificate.deletedAt) {
            const err = new Error('삭제가 잘 안되네요...');
            throw err;
        }
        return res.status(204).json({data: "삭제 성공"});
    } catch(err) {
        return next(err);
    }
}

module.exports = deletedCertificate;