import { logError } from "./log.util.js";

export const sendResponse = (res, statusCode, message, data = null) => {
  const response = {
    status: statusCode,
    ...(message && { message }),
    ...(data && { data }),
  };

  return res.status(statusCode).json(response);
};

export const OK = (res, data) => sendResponse(res, 200, null, data);

export const Accepted = (res, data) => sendResponse(res, 202, null, data);

export const Created = (res, data) => sendResponse(res, 201, null, data);

export const BadRequest = (res, message = MESSAGE_GENERAL.BAD_REQUEST) =>
  sendResponse(res, 400, message);

export const Unauthorized = (res, message = MESSAGE_GENERAL.UNAUTHORIZED) =>
  sendResponse(res, 401, message);

export const NotFound = (res, message = MESSAGE_GENERAL.NOT_FOUND) =>
  sendResponse(res, 404, message);

export const InternalServerError = (
  res,
  err,
  message = MESSAGE_GENERAL.SOMETHING_WRONG
) => {
  logError(err);
  sendResponse(res, 500, message);
};
