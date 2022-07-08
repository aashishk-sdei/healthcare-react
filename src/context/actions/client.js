import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export const exportcsv = (callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    // dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3002/clients/export-csv`, {}, token).then((response) => {
      return callback(response);
    })
  }
};

export const set_active_nev = (params, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_ACTIVE_NAN", data: params });
    return callback(params)
  }
};

export const set_active_main_menu = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_ACTIVE_MAIN_MENU", data: params });
    // return callback(params)
  }
};

export const set_active_menu_title = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_ACTIVE_MENU_TITLE", data: params });
    // return callback(params)
  }
};

export const set_active_sub_menu = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_ACTIVE_SUB_MENU", data: params });
    // return callback(params)
  }
};

export const set_active_sub_menu_title = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_ACTIVE_SUB_MENU_TITLE", data: params });
    // return callback(params)
  }
};


export const list_client = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3002/clients/list-client`, params, token).then((response) => {
      // ApiClient.get(`${apiUrl}3002/clients/list-client`,{},token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        // toast.success(response.message)
        dispatch({ type: "LIST_CLIENT", data: response.data });
      } else if (response.statusCode === 500) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const add_client = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3002/clients/add-client`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);
        let params = { sortBy: -1, sortKey: "createdOn", search: "", limit: 10, page: 1 }
        ApiClient.get(`${apiUrl}3002/clients/list-client`, params, token).then((response) => {
          // ApiClient.get(`${apiUrl}3002/clients/list-client`,{},token).then((response) => {
          dispatch({ type: "ISLOADING", data: false });
          if (response.messageID === 200) {
            // toast.success(response.message)
            dispatch({ type: "LIST_CLIENT", data: response.data });
          } else if (response.statusCode === 500) {
            toast.warn(response.message);
          } else {
            toast.error(response.message);
          }
        });
        if (response.data) dispatch({ type: "ADD_CLIENT", data: response.data });
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

export const update_client = data => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3002/clients/update-client`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        if (data.isActive === true || data.isActive === false) {
          toast.success(response.message)
          let params = {
            sortBy: -1,
            sortKey: "createdOn",
            search: "",
            limit: 10,
            page: 1,
          }
          ApiClient.get(`${apiUrl}3002/clients/list-client`, params, token).then((response) => {
            // ApiClient.get(`${apiUrl}3002/clients/list-client`,{},token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
              // toast.success(response.message)
              dispatch({ type: "LIST_CLIENT", data: response.data });
            } else if (response.statusCode === 500) {
              toast.warn(response.message);
            } else {
              toast.error(response.message);
            }
          });
        } else {
          toast.success(response.message)
          dispatch({ type: "UPDATE_CLIENT", data: response.data });
        }
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
}

export const delete_client = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3002/clients/delete-client`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "DELETE_CLIENT", data: data });
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

export const update_multi_client = data => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3002/clients/update-client`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        // dispatch({ type: "UPDATE_MULTI_CLIENT", data: data });
        let params = {
          sortBy: -1,
          sortKey: "createdOn",
          search: "",
          limit: 10,
          page: 1,
        }
        ApiClient.get(`${apiUrl}3002/clients/list-client`, params, token).then((response) => {
          // ApiClient.get(`${apiUrl}3002/clients/list-client`,{},token).then((response) => {
          dispatch({ type: "ISLOADING", data: false });
          toast.dismiss();
          if (response.messageID === 200) {
            // toast.success(response.message)
            dispatch({ type: "LIST_CLIENT", data: response.data });
          } else if (response.statusCode === 500) {
            toast.warn(response.message);
          } else {
            toast.error(response.message);
          }
        });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
}

export const list_all_client = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3002/clients/list-clients`, {}, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_ALL_CLIENT", data: response.data });
      } else if (response.statusCode === 500) {
        // toast.warn(response.message);
      } else {
        // toast.error(response.message);
      }
    });
  }
};