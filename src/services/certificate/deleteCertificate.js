const { certificateModel } = require('../../db/models');
const { checkAuthorization } = require('../../utils');

const deleteCertificate = async (req, res, next) => {
    const { certificateId } = req.params;
    try {
        const foundCertificate = await certificateModel.getCertificate(certificateId);
        checkAuthorization(foundCertificate.author.userId, req.user.userId);
        const deletedMessage = await certificateModel.deleteCertificate(certificateId);
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = deleteCertificate;