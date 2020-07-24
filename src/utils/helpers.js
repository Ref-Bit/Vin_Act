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

/* Pagination */
export const paginate = (products) => {
  const items_per_page = 4;
  const num_pages = Math.ceil(products.length / items_per_page);
  const new_products = Array.from({ length: num_pages }, (_, i) => {
    const start = i * items_per_page;
    return products.slice(start, start + items_per_page);
  });
  return new_products;
};
