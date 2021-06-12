import React, { useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { ifLogin } from '../actions/user.actions'
import { AuthRoutes, UserRoutes,AdminRoutes} from './ProtectedRoutes';
import { adminRoutes, authRoutes, publicRoutes, userRoutes } from './data.routes';
const Routes = () =>
{
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  useEffect(() =>
  {
    dispatch(ifLogin())
  }, [dispatch])
  return (
    <Switch>
      {publicRoutes.map((route,key) =>
      {
        if (key === 0)
          return <Route exact {...route} key={key} />
        return <Route  {...route} key={key} />
       }
      )}
      {authRoutes.map((route,key) =>
        <AuthRoutes {...route} userInfo={userInfo} key={key}/>
      )}
      {userRoutes.map((route, key) =>
        <UserRoutes {...route} userInfo={userInfo} key={key} />
      )}
      {adminRoutes.map((route, key) =>
        <AdminRoutes {...route} userInfo={userInfo} key={key} />
      )} 
    </Switch>
  )
}

export default Routes
