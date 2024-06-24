const { Router } = require('express');

const { validateCertificate } = require('../middlewares');
const { getAllCertificates, addCertificate, editCertificate, deleteCertificate } = require('../services');

const router = Router();

router.get('/:userId', getAllCertificates);
router.post('/', validateCertificate, addCertificate);
router.put('/:certificateId', validateCertificate, editCertificate);
router.delete('/:certificateId', deleteCertificate);

module.exports = router;