import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Product({ id, image, title, price }) {
  return (
    <article className="product">
      <div className="img-container">
        <img src={image} alt={title || "Default Title"} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || "Default Title"}</p>
        <p className="product-price">${price || 0}</p>
      </div>
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
