// Generic error handler middleware.
function genericErrorHandler(error, request, response, next) {
  response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error!",
    stack: process.env.MODE === "development" ? error.stack : {},
  });
}

// Exports.
export default genericErrorHandler;
