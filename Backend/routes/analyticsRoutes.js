const express = require('express');
const router = express.Router();
const {getEmployeeAnalytics, getManagerAnalytics} = require('../controllers/analyticsController');

router.get('/employee', getEmployeeAnalytics);
router.get('/manager', getManagerAnalytics);

module.exports = router;
