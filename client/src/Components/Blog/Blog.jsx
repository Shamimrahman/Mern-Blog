import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REDIRECT_FALSE, REMOVE_MESSAGE } from "../../store/types/PostTypes";
const Blog = () => {
  const { redirect, message } = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      window.alert(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message]);
  return (
    <div>
      <h1>I am Blog</h1>
    </div>
  );
};

export default Blog;
