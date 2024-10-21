const express = require('express');
const { 
  submitSelfAppraisal, 
  submitSupervisorAppraisal, 
  submitPeerAppraisal, 
  submitJuniorAppraisal, 
//   getAppraisalsForEmployee, 
  getAppraisalsForManager 
} = require('../controllers/appraisalController');
const  checkRole  = require('./../middlewares/checkRole');
const authenticate = require('./../middlewares/authenticate')

const router = express.Router();

// Route to submit self-appraisal
router.post('/self', authenticate, checkRole(['employee']), submitSelfAppraisal);

// Route to submit supervisor appraisal
router.post('/supervisor', checkRole(['supervisor']), submitSupervisorAppraisal);

// Route to submit peer appraisal
router.post('/peer', checkRole(['peer']), submitPeerAppraisal);

// Route to submit junior appraisal
router.post('/junior', checkRole(['junior']), submitJuniorAppraisal);

// // Route to get appraisals for a specific employee
// router.get('/:employeeId', checkRole(['admin', 'manager']), getAppraisalsForEmployee);

// Route for manager to view appraisals for a specific employee
router.get('/:employeeId/manager', checkRole(['manager']), getAppraisalsForManager);

module.exports = router;
