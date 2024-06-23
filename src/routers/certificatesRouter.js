const { Router } = require('express');

const { getAllCertificates, addCertificate, editCertificate, deleteCertificate } = require('../services');

const router = Router();

router.get('/:userId', getAllCertificates);
router.post('/', addCertificate);
router.put('/:certificateId', editCertificate);
router.delete('/:certificateId', deleteCertificate);

module.exports = router;