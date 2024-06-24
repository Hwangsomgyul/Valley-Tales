const { certificateModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../../utils');
const { ConflictError } = require('../../utils/customError');

const deleteCertificate = async (req, res, next) => {
    const { certificateId } = req.params;
    try {
        const foundCertificate = await certificateModel.findOne({ certificateId }).populate('author');
        dataNotFound(foundCertificate);
        checkAuthorization(foundCertificate.author.userId, req.user.userId);
        // 없으면 삭제 안되게 ㄱㄱ
        if (!!foundCertificate.deletedAt) {
            throw new ConflictError('이미 삭제된 데이터입니다.');
        }
        const deletedCertificate = await certificateModel.findOneAndUpdate({ certificateId }, { deletedAt: Date.now() }, { new: true });
        if (!deletedCertificate.deletedAt) {
            throw new Error('삭제에 실패했습니다.');
        }
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteCertificate;