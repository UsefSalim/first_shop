import Login from "../pages/Login";
import Register from "../pages/Register"
import PaymentScreen from '../pages/PaymentScreen';
import OrderScreen from '../pages/OrderScreen';
import ProfileScreen from '../pages/ProfileScreen';
import ShippingScreen from '../pages/ShippingScreen';
import PlaceOrderScreen from '../pages/PlaceOrderScreen';
import Home from "../pages/Home";
import ProductScreen from "../pages/ProductScreen";
import CartScreen from "../pages/CartScreen";
import AdminScreen from '../pages/AdminScreen';


// *** AuthRoutes *** //
export const authRoutes = [
  {
    path: '/login',
    component:Login
  },
  {
    path: '/register',
    component:Register
  },
]

// *** PublicRoutes *** //
export const publicRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/product/:id_product',
    component: ProductScreen
  },
  {
    path: '/cart/:id_product?',
    component: CartScreen
  },
]
// *** UserRoutes *** //
export const userRoutes = [
  {
    path: '/profile',
    component: ProfileScreen
  },
  {
    path: '/shipping',
    component: ShippingScreen
  },
  {
    path: '/payment',
    component: PaymentScreen
  },
  {
    path: '/placeorder',
    component: PlaceOrderScreen
  },
  {
    path: '/order/:id_order',
    component: OrderScreen
  },
]
// *** AdminRoutes *** //
export const adminRoutes = [
  {
    path: '/admin',
    component: AdminScreen
  }
]