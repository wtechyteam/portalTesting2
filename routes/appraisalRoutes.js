const express = require('express');
const { submitAppraisal, getAppraisals } = require('../controllers/appraisalController');
const router = express.Router();

router.post('/', submitAppraisal);
router.get('/:id', getAppraisals);

module.exports = router;