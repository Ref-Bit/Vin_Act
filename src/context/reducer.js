import {
  REMOVE_ITEM,
  INC_ITEM,
  DEC_ITEM,
  ADD_ITEM,
  CLEAR_CART,
} from "./actions";

export default (state, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case INC_ITEM:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item }
      );
    case DEC_ITEM:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item }
      );
    case ADD_ITEM:
      const { id, image, title, price } = action.payload;
      let product = { id, image, title, price, amount: 1 };
      return [...state, product];

    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};
