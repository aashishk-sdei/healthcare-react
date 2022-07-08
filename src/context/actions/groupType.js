import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_group_type = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/group-type/group-type`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_GROUP_TYPE", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const create_group_type = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/group-type/group-type`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        dispatch({ type: "ADD_GROUP_TYPE", data: response.data });
        toast.success(response.message);
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

export const update_group_type = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/group-type/group-type`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "UPDATE_GROUP_TYPE", data: response.data });
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

export const delete_group_type = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/group-type/group-type`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "DELETE_GROUP_TYPE", data: data });
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

export const update_multi_group_type = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/group-type/group-type`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "UPDATE_MULTI_GROUP_TYPE", data: data });
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