import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import MyPage from './MyPage';
import {useSelector} from 'react-redux';

function PrivateRoute({element, ...rest}) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log('from privateroute is loggedin: ', isLoggedIn);
  //   return <Route render={props => (isLoggedIn ? element : <Navigate to="/login" />)} />;
  return isLoggedIn ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
