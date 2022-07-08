
const initialState = { loggedIn: false,isActive:'' };
export const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...{ loggedIn: true }, ...action.data };
    case "FORGOTPASSWORD":
      return {
        ...state, ...initialState
      };
    case "RESETPASSWORD":
      return {
        ...state, ...initialState
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
