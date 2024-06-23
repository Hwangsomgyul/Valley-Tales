const { certificateModel } = require('../../db/models');
const { checkAuthorization, dataNotFound } = require('../utils');

const editCertificate = async (req, res, next) => {
    const { certificateId } = req.params;
    try {
        const foundCertificate = await certificateModel.findOne({ certificateId }).populate('author');
        checkAuthorization(foundCertificate.author.userId, req.user.userId);
        dataNotFound(foundCertificate);
        const { name, organization, issuingDate, expirationDate } = req.body;
        const updatedCertificate = await certificateModel.findOneAndUpdate({ certificateId }, { name, organization, issuingDate, expirationDate }, {new: true});
        return res.json({
            name: updatedCertificate.name,
            organization: updatedCertificate.organization,
            issuingDate: updatedCertificate.issuingDate,
            expirationDate: updatedCertificate.expirationDate,
            createdAt: updatedCertificate.createdAt,
            updatedAt: updatedCertificate.updatedAt,
            certificateId: updatedCertificate.certificateId,
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = editCertificate;