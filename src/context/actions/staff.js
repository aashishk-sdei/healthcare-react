import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export const set_groupId = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "SET_GROUPID", group: params.groupObj });
  }
}

export const list_staff = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-staff`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        if (params.groupObj) {
          dispatch({ type: "LIST_STAFF", data: response.data, count: response.count });
        }
        else {
          dispatch({ type: "LIST_STAFF", data: response.data, count: response.count });
        }
      } else if (response.statusCode === 500) {
        toast.warn(response.message);
      } else {
        dispatch({ type: "LIST_STAFF", data: [], count: 0, groupObj: '' });
        toast.error(response.message);
      }
    });
  }
};



export const list_staff_members = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-staff-member`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        if (params.groupObj) {
          dispatch({ type: "LIST_STAFF_MEMBER", data: response.data });
        }
        else {
          dispatch({ type: "LIST_STAFF_MEMBER", data: response.data });
        }
      }
    });
  }
};



export const list_staff_cat = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/staff-list`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_STAFF_CAT", data: response.data });
      } else if (response.statusCode === 500) {
        toast.warn(response.message);
      } else {
        dispatch({ type: "LIST_STAFF_CAT", data: [], count: 0, groupObj: '' });
        toast.error(response.message);
      }
    });
  }
};

export const add_staff = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/staff/add-staff`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);
        dispatch({ type: "ADD_STAFF_MEMBER", data: response.data });
        return callback(data);
        // let params = {
        //   sortBy: -1,
        //   sortKey: "createdOn",
        //   search: "",
        //   limit: 10,
        //   page: 1,
        //   groupId: data.groupId
        // }
        // ApiClient.get(`${apiUrl}3001/staff/staff-list`, params, token).then((response) => {
        //   // dispatch({ type: "ISLOADING", data: false });
        //   if (response.messageID === 200) {
        //     dispatch({ type: "LIST_STAFF_CAT", data: response.data });
        //     ApiClient.get(`${apiUrl}3001/staff/list-staff`, params, token).then((response) => {
        //       dispatch({ type: "ISLOADING", data: false });
        //       if (response.messageID === 200) {
        //         if (params.groupObj) {
        //           dispatch({ type: "LIST_STAFF", data: response.data, count: response.count });
        //         }
        //         else {
        //           dispatch({ type: "LIST_STAFF", data: response.data, count: response.count });
        //         }
        //       }
        //       else {
        //         dispatch({ type: "LIST_STAFF", data: [], count: 0, groupObj: '' });
        //       }
        //     });
        //   } else if (response.statusCode === 500) {
        //     // toast.warn(response.message);
        //   } else {
        //     dispatch({ type: "LIST_STAFF_CAT", data: [], count: 0, groupObj: '' });
        //     // toast.error(response.message);
        //   }
        // });

      } else if (response.messageID === 404) {
        toast.warn(response.message);
        dispatch({ type: "ISLOADING", data: false });
        return callback(response);
      } else {
        toast.error(response.message);
        dispatch({ type: "ISLOADING", data: false });
        return callback(response);
      }
    });
  }
}
export const assign_client = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/staff/assign-client`, data, token).then((response) => {
      // dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);

        let params = {
          staffId: data.staffId ? data.staffId : data.recordId,
          groupId: data.groupId
        }
        ApiClient.get(`${apiUrl}3001/staff/assignedclient`, params, token).then((response) => {

          dispatch({ type: "ISLOADING", data: false });
          if (response.messageID === 200) {
            dispatch({ type: "LIST_ASSIGNED_CLIENT", assigneddata: response.data });

          } else if (response.messageID === 404) {
            toast.warn(response.message);
          } else {
            toast.error(response.message);
          }
        });
        return callback(response);

        // if (data && data.staffId) {
        //   return callback(response);
        // }
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

export const update_staff = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/staff/update-staff`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "UPDATE_STAFF", data: response.data });
        return callback(response);
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        // dispatch({ type: "ISLOADING", data: false });
        return callback(response);
      } else {
        toast.error(response.message);
        return callback(response);
      }
    });
  }
}

export const delete_staff = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/staff/delete-staff`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
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

export const update_multi_staff = data => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/staff/update-staff`, data, token).then((response) => {
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
          groupId: data.groupId
        }
        ApiClient.get(`${apiUrl}3001/staff/list-staff`, params, token).then((response) => {
          // ApiClient.get(`${apiUrl}3004/clients/list-client`,{},token).then((response) => {
          dispatch({ type: "ISLOADING", data: false });
          if (response.messageID === 200) {
            // toast.success(response.message)
            dispatch({ type: "LIST_STAFF", data: response.data, count: response.count });
          } else if (response.statusCode === 500) {
            toast.warn(response.message);
          } else {
            toast.error(response.message);
          }
        });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
        dispatch({ type: "ISLOADING", data: false });
      } else {
        toast.error(response.message);
      }
    });
  }
}

export const list_view = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-view`, params, token).then((response) => {
      // return false
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_VIEWS", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const list_user_type = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-usertype`, params, token).then((response) => {
      // return false
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_USER", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const list_clientd = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-client`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_STAFF_CLIENT", clientdata: response.data });
      } else if (response.statusCode === 500) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const list_assignedclient = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/assignedclient`, params, token).then((response) => {
      // return false
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_ASSIGNED_CLIENT", assigneddata: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const all_assigned = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/allassignedclient`, params, token).then((response) => {
      // return false
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "ALL_ASSIGNED_CLIENT", newdata: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};
export const list_permission = (params, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-permission`, params, token).then((response) => {
      // return false
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "PERMISSION_MODULE", permission_data: response.data });
        return callback(response)
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};


export const add_permission = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/staff/add-permission`, data, token).then((response) => {
      // dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 201) {
        toast.success(response.message);
        let params = {
          sortBy: -1,
          sortKey: "createdOn",
          search: "",
          limit: 10,
          page: 1,
          groupId: data.groupId
        }
        ApiClient.get(`${apiUrl}3001/staff/list-staff`, params, token).then((response) => {
          dispatch({ type: "ISLOADING", data: false });
          if (response.messageID === 200) {
            if (data.groupId) {
              dispatch({ type: "LIST_STAFF", data: response.data, count: response.count, groupObj: params.groupObj });
            }
            return callback(response);
          } else if (response.statusCode === 500) {
            toast.warn(response.message);
            return callback(response);
          } else {
            dispatch({ type: "LIST_STAFF", data: [], count: 0, groupObj: '' });
            toast.error(response.message);
            return callback(response);
          }
        });

      } else if (response.messageID === 404) {
        toast.warn(response.message);
        dispatch({ type: "ISLOADING", data: false });
      } else {
        toast.error(response.message);
        dispatch({ type: "ISLOADING", data: false });
      }
    });
  }
}
export const list_staff_permission = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/staff/list-staff-permission`, params, token).then((response) => {
      // return false
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "STAFF_PERMISSION_MODULE", staff_permission: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const set_permission = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: "PERMISSION_MODULE", permission_data: [] });
  }
};

export const set_tab = (tab) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_TAB", tabvalue: tab });
  }
};
