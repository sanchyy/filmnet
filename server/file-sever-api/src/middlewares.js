const manageErr = (err, settings) => {
  if (err.code !== settings.code) {
    return false;
  }
  err.message = settings.message;
  err.statusCode = settings.statusCode;

  return true;
};

const eexist = (err, req, res, next) => {
  manageErr(err, {
    code: 'EEXIST',
    message: 'Directory already exists',
    statusCode: 400,
  });
  next(err);
};

const enoent = (err, req, res, next) => {
  manageErr(err, {
    code: 'ENOENT',
    message: 'File or directory does not exist',
    statusCode: 400,
  });
  next(err);
};

const err = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message,
    success: false
  });
};

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

module.exports = {
  eexist,
  enoent,
  err,
  notFound,
  errorHandler 
};
