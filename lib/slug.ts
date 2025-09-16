import slugify from "slugify";

export const toSlug = (data: string) => {
  return slugify(data, {
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: "-",
  });
};
