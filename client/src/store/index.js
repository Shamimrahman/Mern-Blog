import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import AuthReducer from "./reducers/AuthReducers";
import PostReducer from "./reducers/postReducer";
const rootReducer = combineReducers({
  AuthReducer,
  PostReducer,
  //NOW TAKE LOADER IN TYPES
});

//middleware
const middlewares = [thunkMiddleware];
//create centralize store

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
