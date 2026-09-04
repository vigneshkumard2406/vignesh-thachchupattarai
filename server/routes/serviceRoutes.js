// server/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/featured', serviceController.getFeaturedServices);
router.get('/:id', serviceController.getServiceById);

// Admin Protected routes
router.post('/', protect, upload.single('image'), serviceController.createService);
router.put('/:id', protect, upload.single('image'), serviceController.updateService);
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;