const { model } = require('mongoose');
const certificateSchema = require('../schemas/Certificate');
const CertificateModel = model('Certificate', certificateSchema);

module.exports = CertificateModel;
