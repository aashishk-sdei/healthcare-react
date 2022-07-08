import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// QUESTION CATEGORY ACTIONS
export const list_question_category = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/category`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_QUESTION_CATEGORY", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const list_question_categories_for_select = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/category`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_QUESTION_CATEGORY_FOR_SELECT", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const details_question_category = (params, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/category`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "DETAILS_QUESTION_CATEGORY", data: response.data });
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

export const create_question_category = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/questionnaire/category`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ADD_QUESTION_CATEGORY", data: response.data });
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

export const update_question_category = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire/category`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message);
        if (data.status !== 2) dispatch({ type: "UPDATE_QUESTION_CATEGORY", data: response.data });
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

export const delete_question_category = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire/category`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        return callback(response);
        // dispatch({ type: "DELETE_QUESTION_CATEGORY", data: data });
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

export const update_multi_question_category = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire/category`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        toast.success(response.message)
        if (data.status === 1) dispatch({ type: "UPDATE_MULTI_QUESTION_CATEGORY", data: data });
        return callback(response);
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

export const get_language = () => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/language`, {}, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "GET_LANGUAGE", data: response.data });
      } else if (response.messageID === 404) {
        // toast.warn(response.message);
      } else {
        // toast.error(response.message);
      }
    });
  }
}

// QUESTION ACTIONS
export const list_question = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/question`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_QUESTION", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};


// QUESTION ACTIONS
export const list_category_with_question = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/category-question`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "LIST_CATEGORY_QUESTION", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};


export const details_question = (params, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/question`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      toast.dismiss();
      if (response.messageID === 200) {
        dispatch({ type: "DETAILS_QUESTION", data: response.data });
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

export const create_question = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/questionnaire/question`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ADD_QUESTION", data: response.data });
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

export const update_question = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire/question`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "UPDATE_QUESTION", data: response.data });
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

export const delete_question = data => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire/question`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "DELETE_QUESTION", data: data });
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

export const update_multi_question = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire/question`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "UPDATE_MULTI_QUESTION", data: data });
        return callback(response);
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


// QUESTIONNAIRE ACTIONS
export const list_questionnaire = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        dispatch({ type: "LIST_QUESTIONNAIRE", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};

export const details_questionnaire = (params, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        dispatch({ type: "DETAILS_QUESTIONNAIRE", data: response.data });
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

export const create_questionnaire = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.post(`${apiUrl}3001/questionnaire`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message);
        if (response.data) dispatch({ type: "ADD_QUESTIONNAIRE", data: response.data });
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

export const update_questionnaire = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message);
        dispatch({ type: "UPDATE_QUESTIONNAIRE", data: response.data });
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

export const delete_questionnaire = (data) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "DELETE_QUESTIONNAIRE", data: data });
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

export const update_multi_questionnaire = (data, callback) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.put(`${apiUrl}3001/questionnaire`, data, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        toast.success(response.message)
        dispatch({ type: "UPDATE_MULTI_QUESTIONNAIRE", data: data });
        return callback(response);
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

// QUESTION CATEGORY ACTIONS
export const list_questionnaire_types = (params) => {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}3001/questionnaire/types`, params, token).then((response) => {
      dispatch({ type: "ISLOADING", data: false });
      if (response.messageID === 200) {
        dispatch({ type: "LIST_QUESTIONNAIRE_TYPES", data: response.data });
      } else if (response.messageID === 404) {
        toast.warn(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }
};