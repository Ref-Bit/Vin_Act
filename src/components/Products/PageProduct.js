import React, { useContext } from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../../context/products";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export default () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  if (sorted[page]) {
    return (
      <>
        <ProductList products={sorted[page]} />;
        {sorted.length > 1 && (
          <article className="pagination-buttons">
            {page > 0 && (
              <button
                onClick={() => changePage(page - 1)}
                className="prev-page-btn"
              >
                <FaAngleDoubleLeft />
              </button>
            )}
            {sorted.map((_, i) => {
              return (
                <button
                  onClick={() => changePage(i)}
                  key={i}
                  className={`page-btn ${page === i && `page-btn-current`}`}
                >
                  {i + 1}
                </button>
              );
            })}
            {page < sorted.length - 1 && (
              <button
                onClick={() => changePage(page + 1)}
                className="next-page-btn"
              >
                <FaAngleDoubleRight />
              </button>
            )}
          </article>
        )}
      </>
    );
  } else {
    return (
      <h3 className="search-errors">
        Unfortunately your search query did not return any products.
      </h3>
    );
  }
};
