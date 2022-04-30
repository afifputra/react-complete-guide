import { createContext } from "react";

const CartContext = createContext({
  item: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
