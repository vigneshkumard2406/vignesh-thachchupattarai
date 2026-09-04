// server/controllers/serviceController.js
const Service = require('../models/Service');
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

exports.getAllServices = catchAsync(async (req, res) => {
  const services = await Service.getAll();
  res.status(200).json({
    status: 'success',
    results: services.length,
    data: { services },
  });
});

exports.getFeaturedServices = catchAsync(async (req, res) => {
  const services = await Service.getFeatured();
  res.status(200).json({
    status: 'success',
    results: services.length,
    data: { services },
  });
});

exports.getServiceById = catchAsync(async (req, res, next) => {
  const service = await Service.getById(req.params.id);
  if (!service) {
    return next(new AppError('Service not found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { service },
  });
});

exports.createService = catchAsync(async (req, res, next) => {
  const { title, description, is_featured, sort_order } = req.body;

  if (!title || !description) {
    return next(new AppError('Title and description are required', 400));
  }

  const slug = generateSlug(title) + '-' + Date.now().toString().slice(-4);
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newId = await Service.create({
    title,
    slug,
    description,
    image_url: imageUrl,
    is_featured: is_featured === 'true' || is_featured === true,
    sort_order: Number(sort_order) || 0,
  });

  const createdService = await Service.getById(newId);

  res.status(201).json({
    status: 'success',
    message: 'Service created successfully',
    data: { service: createdService },
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  const { title, description, is_featured, sort_order } = req.body;
  const existingService = await Service.getById(req.params.id);

  if (!existingService) {
    return next(new AppError('Service not found', 404));
  }

  const slug = title ? generateSlug(title) : existingService.slug;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  await Service.update(req.params.id, {
    title: title || existingService.title,
    slug,
    description: description || existingService.description,
    image_url: imageUrl,
    is_featured: is_featured !== undefined ? (is_featured === 'true' || is_featured === true) : existingService.is_featured,
    sort_order: sort_order !== undefined ? Number(sort_order) : existingService.sort_order,
  });

  const updatedService = await Service.getById(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Service updated successfully',
    data: { service: updatedService },
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  const deleted = await Service.delete(req.params.id);
  if (!deleted) {
    return next(new AppError('Service not found', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Service deleted successfully',
  });
});