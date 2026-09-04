// server/controllers/enquiryController.js
const Enquiry = require('../models/Enquiry');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createEnquiry = catchAsync(async (req, res, next) => {
  const { customer_name, phone, email, service_id, service_name, message } = req.body;

  if (!customer_name || !phone || !service_name || !message) {
    return next(new AppError('Name, phone, service required, and message are required fields.', 400));
  }

  const newId = await Enquiry.create({
    customer_name,
    phone,
    email,
    service_id: service_id || null,
    service_name,
    message,
  });

  res.status(201).json({
    status: 'success',
    message: 'Your enquiry has been received. Vignesh Thachchupattarai will contact you soon.',
    data: { enquiryId: newId },
  });
});

exports.getAllEnquiries = catchAsync(async (req, res) => {
  const { status } = req.query;
  const enquiries = await Enquiry.getAll(status);
  res.status(200).json({
    status: 'success',
    results: enquiries.length,
    data: { enquiries },
  });
});

exports.updateEnquiryStatus = catchAsync(async (req, res, next) => {
  const { status, admin_notes } = req.body;

  if (!['new', 'contacted', 'completed'].includes(status)) {
    return next(new AppError('Status must be one of: new, contacted, completed', 400));
  }

  const updated = await Enquiry.updateStatus(req.params.id, status, admin_notes);
  if (!updated) {
    return next(new AppError('Enquiry not found', 404));
  }

  const enquiry = await Enquiry.getById(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Enquiry updated successfully',
    data: { enquiry },
  });
});

exports.deleteEnquiry = catchAsync(async (req, res, next) => {
  const deleted = await Enquiry.delete(req.params.id);
  if (!deleted) {
    return next(new AppError('Enquiry not found', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Enquiry deleted successfully',
  });
});

exports.getDashboardStats = catchAsync(async (req, res) => {
  const stats = await Enquiry.getStats();
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});