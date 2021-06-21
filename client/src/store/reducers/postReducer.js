import {
  CREATE_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_TRUE,
  REDIRECT_FALSE,
  SET_MESSAGE,
  REMOVE_MESSAGE,
} from "../types/PostTypes";

let initialState = {
  loading: false,
  createErrors: [],
  redirect: false,
  message: "",
};

const PostReducer = (state = initialState, action) => {
  const { type } = action;

  if (type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (type === CREATE_ERRORS) {
    return { ...state, createErrors: action.payload };
  } else if (type === REDIRECT_TRUE) {
    return { ...state, redirect: true };
  } else if (type === REDIRECT_FALSE) {
    return { ...state, redirect: false };
  } else if (type === SET_MESSAGE) {
    return { ...state, message: action.payload };
  } else if (type === REMOVE_MESSAGE) {
    return { ...state, message: "" };
  } else {
    return state;
  }
};

export default PostReducer;
