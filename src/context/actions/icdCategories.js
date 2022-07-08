import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_icd_categories = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/icd-category`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      // toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_ICD_CATEGORIES", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const list_icd_categories_for_select = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/icd-category`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      // toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_ICD_CATEGORIES_FOR_SELECT", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const details_icd_categories = (params, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/icd-category`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "DETAILS_ICD_CATEGORIES", data: response.data });
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
};


export const create_icd_categories = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/icd-category`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ADD_ICD_CATEGORIES", data: response.data });
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

export const create_icd_categories_csv = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.postFormData(`${apiUrl}3001/icd-category/icd-category`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ADD_ICD_CATEGORIES", data: response.data });
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


export const update_icd_categories = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/icd-category/${data.recordId.replace('#', '')}`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "UPDATE_ICD_CATEGORIES", data: response.data });
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

export const delete_icd_categories = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    // dispatch({ type: "ISLOADING", data: true });
    ApiClient.delete(`${apiUrl}3001/icd-category/${data.recordId.replace('#', '')}`, token).then((response) => {
      // dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        return callback(response)
        // dispatch({ type: "DELETE_ICD_CATEGORIES", data: data, ids:response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        return callback(response)
      } else {
        toast.error(response.message);
        return callback(response)
      }
    });
  }
}

export const update_multi_icd_categories = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    // dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/icd-category/icd-category`, data, token).then((response) => {
      // dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        // dispatch({ type: "UPDATE_MULTI_ICD_CATEGORIES", data: data });
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