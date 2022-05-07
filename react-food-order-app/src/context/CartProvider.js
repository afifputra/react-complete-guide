import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.item.findIndex((item) => item.id === action.item.id);
      const existingCartItem = state.item[existingItemIndex];
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.item];
        updatedItems[existingItemIndex] = updatedItem;
        updatedItems = {
          item: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      } else {
        updatedItems = {
          ...state,
          item: [...state.item, action.item],
          totalAmount: updatedTotalAmount,
        };
      }
      return updatedItems;
    case "REMOVE_ITEM":
      const deletedIndex = state.item.findIndex((item) => item.id === action.id);
      const deletedItem = state.item[deletedIndex];
      const updatedTotal = state.totalAmount - deletedItem.price;
      const updateAmount = {
        ...deletedItem,
        amount: deletedItem.amount - 1,
      };

      let allItems = [...state.item];

      let finalItems;

      if (updateAmount.amount !== 0) {
        allItems.splice(deletedIndex, 1, { ...updateAmount });
        finalItems = {
          item: allItems,
          totalAmount: updatedTotal,
        };
      } else {
        allItems.splice(deletedIndex, 1);
        finalItems = {
          item: allItems,
          totalAmount: updatedTotal,
        };
      }
      return finalItems;
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
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
