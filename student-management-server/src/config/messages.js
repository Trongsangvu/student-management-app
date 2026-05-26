const createMessage = (template) => (field) =>
  template.replace("{field}", field);

export const messageRequired = createMessage("{field} is required");
export const messageInvalid = createMessage("{field} is invalid");
export const messageNotFound = createMessage("{field} not found");
export const messageDeleted = createMessage("Deleted {field} successfully");
export const messageExisted = createMessage("{field} already exists");

export const MESSAGE_GENERAL = {
  SOMETHING_WRONG: "An unexpected error occurred on the server",
  INCORRECT_USERNAME_PASSWORD: "Incorrect username or password",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Resource not found",
  NOT_MATCH: "Don't match",
};

export const MESSAGE_USER = {
  USER_EXISTED_WITH_EMAIL: "An account with this email already exists.",
};
