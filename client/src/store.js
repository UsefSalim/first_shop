import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/products.reducers";
import { cartReducer } from "./reducers/card.reducers";
import { userLoginReducer, userListReducer, userDeleteReducer} from "./reducers/user.reducers"
import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderPayReducer} from './reducers/order.reducers'


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userLoginReducer,
  order: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  userListe: userListReducer,
  userDelete: userDeleteReducer
});


const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {}
const paymentFromStorage = localStorage.getItem('infoPayment')
  ? JSON.parse(localStorage.getItem('infoPayment'))
  : ""


const infoAdressFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('AdressInfo'))
  : {}
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    AdressInfo: infoAdressFromStorage,
    paymentMode:paymentFromStorage
  },
  user: {
    userInfo: userInfoFromStorage
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
