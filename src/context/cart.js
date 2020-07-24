import React, { createContext, useState, useEffect, useReducer } from "react";
import reducer from "./reducer";
import {
  REMOVE_ITEM,
  INC_ITEM,
  DEC_ITEM,
  ADD_ITEM,
  CLEAR_CART,
} from "./actions";

function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  const removeItem = (id) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });
  };

  const incAmount = (id) => {
    dispatch({
      type: INC_ITEM,
      payload: id,
    });
  };
  const decAmount = (id, amount) => {
    if (amount === 1) {
      dispatch({
        type: REMOVE_ITEM,
        payload: id,
      });
      return;
    } else {
      dispatch({
        type: DEC_ITEM,
        payload: id,
      });
    }
  };
  const addToCart = (product) => {
    let item = [...cart].find((item) => item.id === product.id);
    if (item) {
      dispatch({
        type: INC_ITEM,
        payload: product.id,
      });
    } else {
      dispatch({
        type: ADD_ITEM,
        payload: product,
      });
    }
  };
  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        incAmount,
        decAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
