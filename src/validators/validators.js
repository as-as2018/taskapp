import { helpers } from "@vuelidate/validators";


export const minWords = (count) =>
  helpers.withMessage(
    `Description must be at least ${count} words.`,
    (value) => {
      if (!value || typeof value !== "string") return false;
      const words = value.trim().split(/\s+/).filter(Boolean);
      return words.length >= count;
    }
  );

export const commaSeparated = helpers.withMessage(
  "Tags must be comma-separated (e.g. tag1, tag2, tag3).",
  (value) => {
    if (!value || typeof value !== "string") return false;
    return /^(\s*\w+\s*)(,\s*\w+\s*)*$/.test(value.trim());
  }
);
