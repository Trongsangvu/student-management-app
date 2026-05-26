import { CONSTANTS } from "../config/constants.js";
import userService from "../services/user.service.js";
import { jwtDecode } from "../utils/jwt.util.js";
import { ApiResponse } from "./../configs/response.js";

const extractToken = (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return null;
  }
  return authorizationHeader.split(" ")[1];
};

/**
 * Middleware to validate a token and ensure the user has the required role.
 * @param {string|null} requiredRole - The required role for access. Pass null for any authenticated user.
 * @returns {Function} - Middleware function.
 */
const tokenRequired =
  (requiredRole = null) =>
  async (req, res, next) => {
    try {
      const token = extractToken(req.headers.authorization);

      if (!token) {
        return ApiResponse.Unauthorized(res);
      }

      const decoded = jwtDecode(token, CONSTANTS.JWT_SECRET_KEY);
      if (!decoded || !decoded.sub) {
        return ApiResponse.Unauthorized(res);
      }

      const currentUser = await userService.findByIdForAuth(decoded.sub);
      if (!currentUser) {
        return ApiResponse.Unauthorized(res);
      }

      if (requiredRole) {
        const isResetRole =
          requiredRole === CONSTANTS.ROLE_RESET_PASSWORD_TOKEN;
        const userRole = isResetRole ? decoded.role : currentUser.role;

        const rolesArray = Array.isArray(requiredRole)
          ? requiredRole
          : [requiredRole];

        if (!rolesArray.includes(userRole)) {
          return ApiResponse.Unauthorized(res);
        }

        if (isResetRole) {
          const lastToken = token.split(".").pop();
          if (lastToken !== currentUser.reset_password_token) {
            return ApiResponse.Unauthorized(res);
          }
        }
      }
      delete currentUser.reset_password_token;
      req.user = currentUser;
      next();
    } catch (err) {
      ApiResponse.InternalServerError(res, err);
    }
  };
export const allTokenRequired = tokenRequired();
export const adminTokenRequired = tokenRequired("admin");
export const studentTokenRequired = tokenRequired("student");
export const teacherTokenRequired = tokenRequired("teacher");
