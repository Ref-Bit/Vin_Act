import React from "react";
import { ProductContext } from "../context/products";
import { Loading, Filters, PageProduct } from "../components";

export default function Products() {
  const { loading } = React.useContext(ProductContext);
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
