import React from "react";
import { ProductContext } from "../context/products";
import { ProductList, Loading, Filters, PageProduct } from "../components";

export default function Products() {
  const { loading, sorted } = React.useContext(ProductContext);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Filters />
        <PageProduct />
      </>
    );
  }
}
