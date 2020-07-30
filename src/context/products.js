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
    category: "all",
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

  useEffect(() => {
    let newProds = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;
    if (category !== "all") {
      newProds = newProds.filter((item) => item.category === category);
    }
    if (shipping !== false) {
      newProds = newProds.filter((item) => item.free_shipping === shipping);
    }
    if (search !== "") {
      newProds = newProds.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    if (price !== "all") {
      newProds = newProds.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }
    setPage(0);
    setSorted(paginate(newProds));
  }, [filters, products]);

  const changePage = (index) => {
    setPage(index);
  };
  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const val = e.target.value;
    let filterVal;

    if (type === "checkbox") {
      filterVal = e.target.checked;
    } else if (type === "radio") {
      val === "all" ? (filterVal = val) : (filterVal = parseInt(val));
    } else {
      filterVal = val;
    }
    setFilters({ ...filters, [filter]: filterVal });
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
