import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  let { id } = useParams();
  return <h1>hello from product {id} details page</h1>;
}
