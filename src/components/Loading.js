import React from "react";
import loadGif from "../assets/loading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <img src={loadGif} alt="Loading..." />
    </div>
  );
}
