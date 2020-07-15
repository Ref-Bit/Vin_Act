import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import url from "../utils/URL";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/products`)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
