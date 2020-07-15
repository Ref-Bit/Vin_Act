export const featuredProducts = (data) => {
  return data.filter((item) => item.featured === true);
};
