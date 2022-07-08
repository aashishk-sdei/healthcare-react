import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_data = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/language`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        dispatch({ type: "LIST_LANGUAGE", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};


export const create_language = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/language`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ADD_LANGUAGE", data: response.data });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message);
        return callback(response);
      }
    });
  }
}

export const update_language = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/language`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "UPDATE_LANGUAGE", data: response.data,flag:data.flag?true:false });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message);
        return callback(response);
      }
    });
  }
}

export const delete_language = data => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/language`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "DELETE_LANGUAGE", data: data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
}

export const update_multi_language = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/language`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "UPDATE_MULTI_LANGUAGE", data: data });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response);
      } else {
        toast.error(response.message);
        return callback(response);
      }
    });
  }
}

