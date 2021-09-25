import * as actionTypes from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const cartItem = state.cartItems.find(
        (items) => items.product === item.product
      );

      if (cartItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((items) =>
            items.product === cartItem.product
              ? { ...items, quantity: item.quantity }
              : items
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
