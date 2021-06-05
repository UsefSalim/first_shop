import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
} from "../constants/products.constants";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCTS_LIST_SUCCESS:
      return { ...state, loading: false, products: payload };
    case PRODUCTS_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
