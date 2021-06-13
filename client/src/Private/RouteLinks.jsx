import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RouteLinks = (props) => {
  const { user } = useSelector((state) => state.AuthReducer);
  return user ? (
    <Redirect to="/home"></Redirect>
  ) : (
    <Route
      exact={props.exact}
      component={props.component}
      path={props.path}
    ></Route>
  );
};

export default RouteLinks;
