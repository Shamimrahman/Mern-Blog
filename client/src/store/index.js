import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import AuthReducer from "./reducers/AuthReducers";
const rootReducer = combineReducers({
  AuthReducer,
});

//middleware
const middlewares = [thunkMiddleware];
//create centralize store

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
