export const setparams = (param) => {
  return (dispatch) => {
    dispatch({ type: "SET_PARAMS", data: param });
  }
};

export const setparams2 = (param) => {
  return (dispatch) => {
    dispatch({ type: "SET_PARAMS2", data: param });
  }
};
export const setFilterParams = (param) => {
  return (dispatch) => {
    dispatch({ type: "SET_FILTER_PARAMS", data: param });
  }
};
export const setObject1 = (param) => {
  return (dispatch) => {
    dispatch({ type: "SET_OBJ1", data: param });
  }
};

export const resetAll = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_All" });
  }
}