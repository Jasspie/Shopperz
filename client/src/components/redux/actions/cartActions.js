import * as actionTypes from "../constants/cartConstants";
import API from "../../../api/API";

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await API.get(`/api/products/${productId}`);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: data._id,
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: productId,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
