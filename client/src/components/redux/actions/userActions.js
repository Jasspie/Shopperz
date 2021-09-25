import * as actionTypes from "../constants/userConstants";
import API from "../../../api/API";

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await API.post("/api/users/signin", { email, password });
    dispatch({ type: actionTypes.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_REGISTER_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await API.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: actionTypes.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItem");
  dispatch({ type: actionTypes.USER_SIGNOUT });
};

export const userCheckout = (items) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_CHECKOUT_REQUEST,
    payload: { items },
  });
  try {
    const { data } = await API.post("/api/checkout", { items });
    // console.log(data);
    dispatch({ type: actionTypes.USER_CHECKOUT_SUCCESS, payload: data.url });
    localStorage.removeItem("cartItem");
  } catch (error) {
    dispatch({
      type: actionTypes.USER_CHECKOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
