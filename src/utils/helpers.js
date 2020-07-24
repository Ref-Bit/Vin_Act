// Localhost
// import url from "./URL";
import defaultImg from "../assets/mainBcg.jpeg";

export const flattenProduct = (data) => {
  return data.map((item) => {
    // Cloudinary
    let image = (item.image && item.image.url) || defaultImg;
    // Localhost
    // let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
};
export const featuredProducts = (data) => {
  return data.filter((item) => item.featured === true);
};
