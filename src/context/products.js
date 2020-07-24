import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProduct, paginate } from "../utils/helpers";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    categories: "all",
    shipping: false,
    price: "all",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/products`)
      .then(({ data }) => {
        setSorted(paginate(flattenProduct(data)));
        setProducts(flattenProduct(data));
        setFeatured(featuredProducts(flattenProduct(data)));
        setLoading(false);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, []);

  const changePage = (index) => {
    setPage(index);
  };
  const updateFilters = (e) => {
    console.log(e);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
