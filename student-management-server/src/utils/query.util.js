const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const buildSearchQuery = (search, fields = []) => {
  if (!search?.trim() || !fields?.length) return null;

  const keyword = search.trim();
  const escapedKeyword = escapeRegExp(keyword);
  const regex = new RegExp(escapedKeyword, "i");

  return {
    $or: fields.map((field) => {
      if (typeof field === "function") {
        return field(regex);
      }

      return {
        [field]: regex,
      };
    }),
  };
};
