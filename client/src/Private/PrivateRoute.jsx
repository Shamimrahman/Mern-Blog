import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

//user ekmatro login hoilei dekhte parbe
//otherwise no
const PrivateRoute = (props) => {
  //state get
  const { user } = useSelector((state) => state.AuthReducer);

  //route er info ashbe apps.js theke
  //so blog page amra login chara access korte parbo na
  return user ? (
    <Route
      path={props.path}
      exact={props.exact}
      component={props.component}
    ></Route>
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default PrivateRoute;
