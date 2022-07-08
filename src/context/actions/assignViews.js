import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// Assign views to users
export const assign_views = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/assign-view`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ASSIGN_VIEW", data: response.data });
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

// Assign views to users
export const assigned_views = (data) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.fetch(`${apiUrl}3001/assigned-view/${data.id}`, {}, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "ASSIGNED_VIEW", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
}

// Assign views to users
export const assigned_reset_views = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: "ASSIGNED__RESETVIEW", data: [] });
  }
}
