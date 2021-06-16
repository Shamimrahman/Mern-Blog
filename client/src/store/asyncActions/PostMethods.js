import axios from "axios";
import { CREATE_ERRORS, SET_LOADER, CLOSE_LOADER } from "../types/PostTypes";

//jar kase valid token ase shudhu shei ai post korbe
const token = localStorage.getItem("myToken");
export const createAction = (postData) => {
  //post data means form data in create dispatch method
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          //bearer hoilo jwt token k permit kore
        },
      };

      const { data } = await axios.post("/createpost", postData, config);
      console.log(data);
      dispatch({ type: CLOSE_LOADER });
    } catch (error) {
      const { errors } = error.response.data;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: CREATE_ERRORS, payload: errors });

      console.log(error.message);
      console.log(error.response.data);
    }
  };
};
//now ai create action k amader createpost comp a use korte hobe or import korte hobe
