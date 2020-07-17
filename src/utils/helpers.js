// Localhost
// import url from "./URL";

export const flattenProduct = (data) => {
  return data.map((item) => {
    // Cloudinary
    let image = item.image.url;
    // Localhost
    // let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
};
export const featuredProducts = (data) => {
  return data.filter((item) => item.featured === true);
};
