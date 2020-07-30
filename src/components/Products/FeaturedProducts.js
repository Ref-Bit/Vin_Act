import React, { useContext } from "react";
import { Loading, ProductList } from "..";
import { ProductContext } from "../../context/products";

export default function FeaturedProducts() {
  const { loading, featured } = useContext(ProductContext);

  return loading ? <Loading /> : <ProductList title="" products={featured} />;
}
