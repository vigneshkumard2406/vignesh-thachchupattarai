// server/controllers/projectController.js
const Project = require('../models/Project');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const generateSlug = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

exports.getAllProjects = catchAsync(async (req, res) => {
  const { category } = req.query;
  const projects = await Project.getAll(category);
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: { projects },
  });
});

exports.getFeaturedProjects = catchAsync(async (req, res) => {
  const projects = await Project.getFeatured();
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: { projects },
  });
});

exports.getProjectById = catchAsync(async (req, res, next) => {
  const project = await Project.getById(req.params.id);
  if (!project) {
    return next(new AppError('Project not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { project },
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const { title, category, description, is_featured, completion_date } = req.body;

  if (!title || !category || !description) {
    return next(new AppError('Title, category, and description are required', 400));
  }

  if (!req.file) {
    return next(new AppError('A project display image is required', 400));
  }

  const slug = generateSlug(title) + '-' + Date.now().toString().slice(-4);
  const imageUrl = `/uploads/${req.file.filename}`;

  const newId = await Project.create({
    title,
    slug,
    category,
    description,
    image_url: imageUrl,
    is_featured: is_featured === 'true' || is_featured === true,
    completion_date: completion_date || null,
  });

  const createdProject = await Project.getById(newId);

  res.status(201).json({
    status: 'success',
    message: 'Project created successfully',
    data: { project: createdProject },
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const { title, category, description, is_featured, completion_date } = req.body;
  const existingProject = await Project.getById(req.params.id);

  if (!existingProject) {
    return next(new AppError('Project not found', 404));
  }

  const slug = title ? generateSlug(title) : existingProject.slug;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  await Project.update(req.params.id, {
    title: title || existingProject.title,
    slug,
    category: category || existingProject.category,
    description: description || existingProject.description,
    image_url: imageUrl,
    is_featured: is_featured !== undefined ? (is_featured === 'true' || is_featured === true) : existingProject.is_featured,
    completion_date: completion_date !== undefined ? completion_date : existingProject.completion_date,
  });

  const updatedProject = await Project.getById(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Project updated successfully',
    data: { project: updatedProject },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const deleted = await Project.delete(req.params.id);
  if (!deleted) {
    return next(new AppError('Project not found', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Project deleted successfully',
  });
});