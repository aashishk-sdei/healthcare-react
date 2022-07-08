import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_care_path = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/care-path`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "LIST_CARE_PATH", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const serach_diagnosis = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/diagnosis`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "LIST_DIGNOSIS_SEARCH", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};

export const diagnosis_load_more = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/diagnosis`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "LIST_DIGNOSIS_LOAD_MORE", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};



export const serach_diagnosis_view = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/diagnosis-view`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "LIST_DIAGNOSIS", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};

export const diagnosis_view_load_more = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/diagnosis-view`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                dispatch({ type: "LIST_DIAGNOSIS_LOAD_MORE", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};


export const create_care_path = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/care-path`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                toast.success(response.message);
                if (response.data) dispatch({ type: "ADD_CARE_PATH", data: response.data });
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

export const update_care_path = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/care-path`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_CARE_PATH", data: response.data, flag: data.flag ? true : false });
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



export const update_multi_care_path = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/care-path`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_CARE_PATH", data: data });
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

