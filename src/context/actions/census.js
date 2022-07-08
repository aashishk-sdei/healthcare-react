import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_census= (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/census`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_CENSUS", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};



export const create_census = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.postFormData(`${apiUrl}3001/census`, data, token).then((response) => {
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

export const update_census = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/census`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_CENSUS", data: response.data, flag: data.flag ? true : false });
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

export const update_multi_census = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/census`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_CENSUS", data: data });
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

