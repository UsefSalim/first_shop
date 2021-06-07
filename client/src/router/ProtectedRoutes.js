import { Redirect, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
export const AuthRoutes = ({ component: Component, userInfo,...rest }) =>
{
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={() =>
        !userInfo?.isAuthenticated ? (
          <Component />
        ) : userInfo?.isAuthenticated && userInfo?.role === 'User' ? (
            <Redirect to={(location.search?.split('=')[1])||(location.state?.userpath) || 'profile'} />
          ) : userInfo?.isAuthenticated && userInfo?.role === 'Admin' && (
              <Redirect to={(location.search?.split('=')[1]) ||(location.state?.adminpath) || '/admin'} />
        )
      }
    />
  )
}
export const UserRoutes = ({ component: Component, path, userInfo, ...rest }) =>
{
  console.log({ ...rest }, 'rest')
  return (
    <Route
      {...rest}
      render={() =>
        userInfo?.isAuthenticated && userInfo?.role === 'User' ? <Component /> : <Redirect to={{
          pathname: "/",
          state: { userpath: path }
        }} />
      }
    />
  )
}
export const AdminRoutes = ({ component: Component, path, userInfo, ...rest }) =>
{

  return (
    <Route
      render={() =>
        userInfo?.isAuthenticated && userInfo?.roles === 'Admin' ? <Component {...rest} /> : <Redirect to={{
          pathname: "/",
          state: { adminpath: path }
        }} />
      }
    />
  )
}