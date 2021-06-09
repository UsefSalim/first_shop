import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS
} from "../constants/products.constants";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LIST_REQUEST:
      return { ...state, loading: true};
    case PRODUCTS_LIST_SUCCESS:
      return { ...state, loading: false, products: payload };
    case PRODUCTS_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product: {reviews:[]} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCTS_DETAILS_SUCCESS:
      return { ...state, loading: false, product: payload };
    case PRODUCTS_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
