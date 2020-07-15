import React from "react";
import { Link } from "react-router-dom";
import { Hero, FeaturedProducts } from "../components";

export default function Home() {
  return (
    <>
      <Hero>
        <Link to="/products" className="btn btn-primary btn-hero">
          our products
        </Link>
      </Hero>
      <FeaturedProducts />
    </>
  );
}
