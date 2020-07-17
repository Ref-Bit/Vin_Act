import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  About,
  Cart,
  Error,
  Checkout,
  Login,
  Products,
  ProductDetails,
} from "./pages";
import { Header, Alert } from "./components";

export default function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/products/:id" children={<ProductDetails />} />
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
