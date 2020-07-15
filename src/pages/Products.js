import React from "react";
import { ProductContext } from "../context/products";
import { ProductList, Loading } from "../components";

export default function Products() {
  const { loading, products } = React.useContext(ProductContext);
  if (loading) {
    return <Loading />;
  } else {
    return <ProductList title="our products" products={products} />;
  }
}
