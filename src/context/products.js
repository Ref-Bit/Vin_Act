import React, { useState, createContext } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

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
