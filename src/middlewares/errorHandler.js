const { StatusCodes } = require("http-status-codes");
const responseHelper = require("../utils/responseHelper");

module.exports = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`, err.stack);

  responseHelper.error(
    res,
    err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    err.message || "Something went wrong"
  );
};
