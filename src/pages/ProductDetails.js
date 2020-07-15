import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProductContext } from "../context/products";
import { Loading } from "../components";

export default function ProductDetails() {
  let { id } = useParams();
  const history = useHistory();
  const { products } = useContext(ProductContext);
  const product = products.find((item) => item.id === parseInt(id));

  return products.length === 0 ? (
    <Loading />
  ) : (
    <section className="single-product">
      <img
        src={product.image.url}
        alt={product.title}
        className="single-product-image"
      />
      <h1>{product.title}</h1>
      <h2>${product.price}</h2>
      <p>{product.description}</p>
      <button
        className="btn btn-primary btn-block"
        onClick={() => {
          // add to cart
          history.push("/cart");
        }}
      >
        add to cart
      </button>
    </section>
  );
}
