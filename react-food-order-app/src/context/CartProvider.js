import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        item: [...state.item, action.item],
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        item: state.item.filter((item) => item.id !== action.id),
        totalAmount: state.totalAmount - action.item.price * action.item.amount,
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatchCart({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCart({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cartContext = {
    item: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
