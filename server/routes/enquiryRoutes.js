// server/routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', enquiryController.createEnquiry);
router.get('/stats', protect, enquiryController.getDashboardStats);
router.get('/', protect, enquiryController.getAllEnquiries);
router.put('/:id', protect, enquiryController.updateEnquiryStatus);
router.delete('/:id', protect, enquiryController.deleteEnquiry);

module.exports = router;