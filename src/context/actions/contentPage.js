import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const list_content_page = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/content-page`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            // toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_CONTENT_PAGE", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};

export const list_content_page_for_select = (params) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.get(`${apiUrl}3001/content-page`, params, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                dispatch({ type: "LIST_CONTENT_PAGE_FOR_SELECT", data: response.data });
            } else if (response.messageID === 404) {
                toast.warn(response.message);
            } else {
                toast.error(response.message);
            }
        });
    }
};

export const create_content_page = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.post(`${apiUrl}3001/content-page`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                if (response.data) dispatch({ type: "ADD_CONTENT_PAGE", data: response.data });
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

export const update_content_page = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/content-page`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message);
                dispatch({ type: "UPDATE_CONTENT_PAGE", data: response.data, flag: data.flag ? true : false });
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

export const update_multi_content_page = (data, callback) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        dispatch({ type: "ISLOADING", data: true });
        ApiClient.put(`${apiUrl}3001/content-page`, data, token).then((response) => {
            dispatch({ type: "ISLOADING", data: false });
            toast.dismiss();
            if (response.messageID === 200) {
                toast.success(response.message)
                dispatch({ type: "UPDATE_MULTI_CONTENT_PAGE", data: data });
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