import React, { useEffect, useState, createContext, useReducer } from "react";

import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import Home from "./Components/Home/Home";
import Registration from "./Components/Registration/Registration";
import Blog from "./Components/Blog/Blog";
import Createpost from "./Components/CreatePost/Createpost";
import { Provider } from "react-redux";
import store from "./store/index";
import { initialState, reducer } from "./reducer/useReducer";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from "./Private/PrivateRoute";
import RouteLinks from "./Private/RouteLinks";
//for navbar state change

export const usercontext = createContext();
export const Routing = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/registration" component={Registration}></Route>
        <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
        <Route exact path="/logout" component={Logout}></Route>
        <PrivateRoute exact path="/blog" component={Blog}></PrivateRoute>
        <Route exact path="/cp" component={Createpost}></Route>

        <RouteLinks exact path="/" component={Login}></RouteLinks>
      </Switch>
      ;
    </div>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider store={store}>
      <div>
        <Navbar></Navbar>
        <Routing></Routing>
      </div>
    </Provider>
  );
};

export default App;
