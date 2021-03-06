import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_INFO_ADRESS, CART_INFO_METHODE_PAYMENT, CART_RESET} from "../constants/cart.constant";

export const cartReducer = (state = { cartItems: [], AdressInfo : {}}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_INFO_ADRESS:
      return {
        ...state,
        AdressInfo: action.payload,
      }
    case CART_INFO_METHODE_PAYMENT:
      return {
        ...state,
        paymentMode: action.payload,
      }
    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state;
  }
};
