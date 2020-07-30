import React, { useContext } from "react";
import { ProductContext } from "../../context/products";

export default () => {
  const {
    filters: { search, category, shipping, price },
    updateFilters,
    sorted,
  } = useContext(ProductContext);
  return (
    <div className="filters-section">
      <h2 className="section-title">Search products</h2>
      <form className="filters-form">
        <div className="form-group">
          <label htmlFor="search">search</label>
          <input
            type="text"
            id="search"
            name="search"
            className="form-control"
            value={search}
            onChange={updateFilters}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            className="form-control"
            value={category}
            onChange={updateFilters}
          >
            <option value="all">all</option>
            <option value="computer">computer</option>
            <option value="mobile">mobile</option>
            <option value="tab">tab</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            onChange={updateFilters}
            checked={shipping}
          />
          <label htmlFor="shipping">free shipping</label>
        </div>
        <div className="form-group">
          <p>price</p>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              id="price"
              name="price"
              value="all"
              checked={price === "all"}
              onChange={updateFilters}
            />
            &nbsp; all
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              id="price"
              name="price"
              value="0"
              checked={price === 0}
              onChange={updateFilters}
            />
            &nbsp; $0-$300
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              id="price"
              name="price"
              value="300"
              checked={price === 300}
              onChange={updateFilters}
            />
            &nbsp; $300-$650
          </label>
          <label style={{ display: "block" }}>
            <input
              type="radio"
              id="price"
              name="price"
              value="650"
              checked={price === 650}
              onChange={updateFilters}
            />
            &nbsp; over $650
          </label>
        </div>
      </form>
      <h6>total products: {sorted.flat().length}</h6>
      <hr />
    </div>
  );
};
