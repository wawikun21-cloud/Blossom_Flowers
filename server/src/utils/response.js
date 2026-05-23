const successResponse = (res, data, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data
  })
}

const errorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? error : undefined
  })
}

module.exports = {
  successResponse,
  errorResponse
}
