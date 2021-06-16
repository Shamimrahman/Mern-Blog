import { CREATE_ERRORS, SET_LOADER, CLOSE_LOADER } from "../types/PostTypes";

let initialState = {
  loading: false,
  createErrors: [],
};

const PostReducer = (state = initialState, action) => {
  const { type } = action;

  if (type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (type === CREATE_ERRORS) {
    return { ...state, createErrors: action.payload };
  } else {
    return state;
  }
};

export default PostReducer;
