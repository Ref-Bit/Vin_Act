import React from "react";
import { ProductContext } from "../context/products";

export default function Products() {
  const res = React.useContext(ProductContext);
  console.log(res);
  return <h1>hello from products page</h1>;
}
