const parsePositiveInt = (value, fallback) => {
  const number = Number(value);

  return Number.isSafeInteger(number) && number > 0 ? number : fallback;
};

export const getPagination = (query) => {
  const page = parsePositiveInt(query.page, 1);
  const limit = parsePositiveInt(query.limit, 10);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
