const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = err.add ? err.add : `Duplicate Field value entered`;
    error = new ErrorResponse(message, err.add ? 409 : 422);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(error.message);

  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || "Server Error",
    add: err.add,
  });
};

module.exports = errorHandler;
