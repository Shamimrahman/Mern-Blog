import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import Home from "./Components/Home/Home";
import Registration from "./Components/Registration/Registration";
import Blog from "./Components/Blog/Blog";
import Createpost from "./Components/CreatePost/Createpost";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/registration" component={Registration}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/blog" component={Blog}></Route>
        <Route exact path="/cp" component={Createpost}></Route>

        <Route exact path="/" component={Login}></Route>
      </Switch>
    </div>
  );
};

export default App;
