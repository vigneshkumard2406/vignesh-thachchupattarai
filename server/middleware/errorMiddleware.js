// server/middleware/errorMiddleware.js

const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  // Handle Multer upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    err.message = 'Uploaded file is too large. Maximum allowed size is 5MB.';
  }

  // Handle MySQL Duplicate Entry (e.g., duplicate slug or username)
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 400;
    err.message = 'A record with that unique field already exists.';
  }

  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };