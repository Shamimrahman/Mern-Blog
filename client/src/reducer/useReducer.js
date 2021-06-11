export let initialState = null;

export const reducer = (state = initialState, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};

//re fresh korar poro navbar er state change hobe na
initialState = {
  loggedIn: localStorage.getItem("isLoggedin") || false,
};
