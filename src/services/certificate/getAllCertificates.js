const { userModel, certificateModel } = require('../../db/models');

const getAllCertificates = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const author = await userModel.findById(userId);
        const allCertificates = await certificateModel.find({ author });
        const data = allCertificates.map(certificate => ({
            name: certificate.name,
            organization: certificate.organization,
            issuingDate: certificate.issuingDate,
            expirationDate: certificate.expirationDate,
            createdAt: certificate.createdAt,
            updatedAt: certificate.updatedAt,
            certificateId: certificate.certificateId,
        }));
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = getAllCertificates;