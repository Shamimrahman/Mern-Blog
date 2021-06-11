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

//for navbar state change

export const usercontext = createContext();
export const Routing = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/registration" component={Registration}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/blog" component={Blog}></Route>
        <Route exact path="/cp" component={Createpost}></Route>

        <Route exact path="/" component={Login}></Route>
      </Switch>
      ;
    </div>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <usercontext.Provider value={{ state, dispatch }}>
      <Provider store={store}>
        <div>
          <Navbar></Navbar>
          <Routing></Routing>
        </div>
      </Provider>
    </usercontext.Provider>
  );
};

export default App;
