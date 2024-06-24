const { userModel, certificateModel } = require('../../db/models');

const addCertificate = async (req, res, next) => {
    try {
        const { name, organization, issuingDate, expirationDate } = req.body;
        const user = await userModel.findById(req.user.userId);
        const addedCertificate = await certificateModel.create({
            author: user,
            name,
            organization,
            issuingDate,
            expirationDate,
        });
        if (!addedCertificate) {
            throw new Error('추가에 실패하였습니다.');
        }
        return res.json({
            name: addedCertificate.name,
            organization: addedCertificate.organization,
            issuingDate: addedCertificate.issuingDate,
            expirationDate: addedCertificate.expirationDate,
            createdAt: addedCertificate.createdAt,
            updatedAt: addedCertificate.updatedAt,
            certificateId: addedCertificate.certificateId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = addCertificate;