import { toast } from "react-toastify";

import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";

import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const login = (data, callback) => {
  return (dispatch) => {
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/auth/login`, data).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      // toast.dismiss();
      if (response.messageID === 200) {
        // toast.success(response.message);
        dispatch({ type: "LOGIN", data: response.data });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message)
      }
    });
  }
};

export const register = (data, callback) => {
  return (dispatch) => {
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/group-admin/register`, data).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);
        // return false
        // dispatch({ type: "REGISTER", data: response.data });
        // return callback(response);
        let obj = {
          email: data.email,
          password: data.password,
        }
        ApiClient.post(`${apiUrl}3001/auth/login`, obj).then((response) => {
          dispatch({ type: "ISLOADING", data: false });
          if (response.messageID === 200) {
            // toast.success(response.message);
            dispatch({ type: "LOGIN", data: response.data });
            return callback(response);

          } else if (response.messageID === 404) {
            // toast.warn(response.message);
            return callback(response);
          } else {
            // toast.error(response.message)
          }
        });
      }
      else if (response.messageID === 200) {
        toast.warn(response.message);
        return callback(response);
      }
      else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message)
      }
    });
  }
};
export const forgot_password = (data, callback) => {
  return (dispatch) => {
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/auth/forgot-password`, data).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "FORGOTPASSWORD", data });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message)
      }
    });
  }
};

export const reset_password = (data, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: "ISLOADING", data: true });
    const { user: { token } } = getState();
    ApiClient.post(`${apiUrl}3001/auth/change-password`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "RESETPASSWORD", data });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message)
      }
    });
  }
};

export const logout = (data, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: "ISLOADING", data: true });
    const { user: { token } } = getState();
    ApiClient.get(`${apiUrl}3001/auth/logout`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "LOGOUT", data: {} });
        // dispatch({ type: "SET_GROUPID", group:{}});
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        dispatch({ type: "LOGOUT", data: {} });
        toast.error(response.message);
      }
    });
  }
};

export const loader = (flag) => {
  return (dispatch, getState) => {
    dispatch({ type: "ISLOADING", data: flag });
  }
}