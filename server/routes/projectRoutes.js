// server/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/featured', projectController.getFeaturedProjects);
router.get('/:id', projectController.getProjectById);

// Admin Protected routes
router.post('/', protect, upload.single('image'), projectController.createProject);
router.put('/:id', protect, upload.single('image'), projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;