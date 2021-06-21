import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REDIRECT_FALSE, REMOVE_MESSAGE } from "../../store/types/PostTypes";
const Blog = () => {
  const { redirect, message } = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();

  //get user for fetch purpose
  const { user } = useSelector((state) => state.AuthReducer);
  console.log(user);
  const { _id } = user;
  console.log(_id);
  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      window.alert(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
    //now ekhn amader post gula aikhn a fetch korar jonno api create korte hobe
  }, [message]);
  return (
    <div>
      <h1>I am Blog</h1>
    </div>
  );
};

export default Blog;
